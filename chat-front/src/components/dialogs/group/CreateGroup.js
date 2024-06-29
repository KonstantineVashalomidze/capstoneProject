import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Button,
    Box,
    Chip,
    Autocomplete,
} from "@mui/material";
import {fetchFriendsAction, fetchGroupConversationsAction} from "../../../redux/slices/app";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../../../sockets/socket";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroup = ({ open, handleClose }) => {
    const [groupName, setGroupName] = useState("");
    const [userInput, setUserInput] = useState(null);
    const [people, setPeople] = useState([]);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const friends = useSelector(state => state.app.loggedInUser.friends);
    const loggedInUser = useSelector(state => state.app.loggedInUser);

    useEffect(() => {
        dispatch(fetchFriendsAction());
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!groupName.trim()) {
            setError("Please enter a group name.");
        } else if (people.length < 2) {
            setError("Please add at least two people.");
        } else {
            // Handle form submission logic here
            // console.log("Group Name:", groupName);
            // console.log("People IDs:", people.map(p => p._id));

            socket.emit("startConversation", { initiator: loggedInUser._id,  groupName: groupName, conversationParticipants: people });
            dispatch(fetchGroupConversationsAction())


            // Reset form after submission
            setGroupName("");
            setPeople([]);
            setError("");
        }
    };

    const addPerson = (person) => {
        if (person && person._id && !people.some(p => p._id === person._id)) {
            setPeople([...people, { _id: person._id, name: `${person.firstName} ${person.lastName}` }]);
            setError(""); // Clear error when a person is added
        }
    };
    const removePerson = (personId) => {
        setPeople(people.filter((p) => p._id !== personId));
    };



    return (
        <Dialog
            fullWidth
            maxWidth={"xs"}
            open={open}
            onClose={handleClose}
            keepMounted
            TransitionComponent={Transition}
            sx={{ p: 4 }}
        >
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="groupName"
                        label="Group Name"
                        type="text"
                        fullWidth
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        error={!groupName.trim() && !!error}
                        helperText={!groupName.trim() && error}
                        onFocus={() => setError("")}
                    />
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                        <Autocomplete
                            freeSolo
                            options={friends}
                            getOptionLabel={(option) =>
                                typeof option === 'string' ? option : `${option.firstName} ${option.lastName}`
                            }
                            renderOption={(props, option) => (
                                <li {...props}>
                                    {typeof option === 'string' ? option : `${option.firstName} ${option.lastName}`}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin="dense"
                                    label="Add Person"
                                    type="text"
                                    fullWidth
                                    error={people.length < 2 && !!error}
                                    helperText={people.length < 2 && error}
                                    onFocus={() => setError("")}
                                />
                            )}
                            onChange={(e, value) => {
                                if (value && typeof value === 'object') {
                                    addPerson(value);
                                }
                            }}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            sx={{ ml: 1 }}
                            onClick={() => addPerson(userInput)}
                            disabled={!userInput}
                        >
                            Add
                        </Button>
                    </Box>
                    <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap" }}>
                        {people.map((p) => (
                            <Chip
                                key={p._id}
                                label={p.name}
                                onDelete={() => removePerson(p._id)}
                                sx={{ mr: 1, mt: 1 }}
                            />
                        ))}
                    </Box>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={handleClose} sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                            Create
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroup;