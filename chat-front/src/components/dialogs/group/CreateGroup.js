import React, { useState } from "react";
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
import {User_options} from "../../../data";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroup = ({ open, handleClose }) => {
    const [groupName, setGroupName] = useState("");
    const [userInput, setUserInput] = useState(null);
    const [people, setPeople] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!groupName.trim()) {
            setError("Please enter a group name.");
        } else if (people.length < 2) {
            setError("Please add at least two people.");
        } else {
            // Handle form submission logic here
            console.log("Group Name:", groupName);
            console.log("People:", people);
            // Reset form after submission
            setGroupName("");
            setPeople([]);
            setError("");
        }
    };

    const addPerson = (value) => {
        if (value && !people.includes(value)) {
            setPeople([...people, value]);
            setUserInput(null);
            setError(""); // Clear error when a person is added
        }
    };

    const removePerson = (personToRemove) => {
        setPeople(people.filter((p) => p !== personToRemove));
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
                            options={User_options}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin="dense"
                                    label="Add Person"
                                    type="text"
                                    fullWidth
                                    value={userInput || ""}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            addPerson(userInput);
                                        }
                                    }}
                                    error={people.length < 2 && !!error}
                                    helperText={people.length < 2 && error}
                                    onFocus={() => setError("")}
                                />
                            )}
                            onInputChange={(e, value) => setUserInput(value)}
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
                                key={p}
                                label={p}
                                onDelete={() => removePerson(p)}
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