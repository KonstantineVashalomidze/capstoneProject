import React from "react";
import Chats from "./Chats";
import {Box, Stack} from "@mui/material";
import Conversation from "../../components/conversation";
import Contact from "../../components/contact/Contact";
import {useSelector} from "react-redux";
import SharedMessages from "../../components/sharedMessages/SharedMessages";
import TopMessages from "../../components/sharedMessages/TopMessages";
import SelectConversation from "../../assets/Illustration/SelectConversation";


const GeneralApp = () => {

  const contactInfo = useSelector(state => state.app.contactInfo);
  const currentConversation = useSelector(state => state.app.conversations.currentConversation);
  return (
    <>
        <Stack direction={"row"} >
            {(contactInfo.isOpened && currentConversation !== null) && (() => {
                switch (contactInfo.currentPage.name) {
                    case "contactInfo":
                        return <Contact />;
                    case "topMessages":
                        return <TopMessages />;
                    case "media":
                        return <SharedMessages />;
                    default:
                        break;
                }
            }) ()}
            <Box sx={{height: "100vh", width: (contactInfo.isOpened && currentConversation !== null) ? "calc(100vw - 740px)" : "calc(100vw - 420px)" }}>
                {currentConversation === null ? <SelectConversation /> : <Conversation />}
            </Box>
            <Chats />
        </Stack>
    </>
  );
};
export default GeneralApp;
