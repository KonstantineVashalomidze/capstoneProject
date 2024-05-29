// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import {Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import MuiAlert from "@mui/material/Alert";
import {forwardRef} from "react";
import {setSnackbarAction} from "./redux/slices/app";

const Alert = forwardRef(function Alert(props, ref) {
   return <MuiAlert evaluation={6} ref={ref} variant={"filled"} {...props} />;
});

function App() {
    const {isOpened, message, severity, duration} = useSelector((state) => state.app.logs.snackbar);
    const dispatch = useDispatch();
    const vertical = "top";
    const horizontal = "right";

    return (
    <>
        <ThemeProvider>
            <ThemeSettings>
                {" "}
                <Router />{" "}
            </ThemeSettings>
        </ThemeProvider>
        {(message && isOpened) &&
        <Snackbar anchorOrigin={{vertical, horizontal}} open={isOpened} autoHideDuration={duration} key={vertical + horizontal} onClose={() => {
            dispatch(setSnackbarAction({
                duration: 3000,
                isOpened: false,
                message: "Hid snackbar",
                severity: "success"
            }));
        }}>
            <Alert
                severity={severity}
                variant="filled"
                onClose={() => {
                    dispatch(setSnackbarAction({
                        duration: 3000,
                        isOpened: false,
                        message: "Hid snackbar",
                        severity: "success"
                    }));
                }}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>}
    </>
  );
};

export default App;
