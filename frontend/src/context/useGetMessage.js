import React, { useEffect, useState } from 'react'
import useConversation from '../statemanage/useConversation.js'
import axios from "axios"

export default function useGetMessage() {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const res = await axios.get(
                        `/api/message/get/${selectedConversation._id}/messages`
                    );

                    setMessages(res.data.messages); // ✅ FIXED
                } catch (error) {
                    console.log("Error in useGetMessage:", error);
                } finally {
                    setLoading(false); // ✅ move to finally to guarantee state update
                }
            }
        };
        getMessages();
    }, [selectedConversation, setMessages]);

    return {
        messages,
        loading
    }
}

// import { useEffect, useState } from "react";
// import useConversation from "../statemanage/useConversation.js";
// import axios from "axios";

// export default function useGetMessage() {
//   const [loading, setLoading] = useState(false);
//   const { selectedConversation, setMessages, messages } = useConversation();

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedConversation?._id) return;

//       setLoading(true);
//       try {
//         const res = await axios.get(`/api/message/${selectedConversation._id}`);
//         setMessages(res.data.messages); // ✅ Set to Zustand
//       } catch (err) {
//         console.error("Failed to load messages", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [selectedConversation, setMessages]);

//   return { messages, loading }; // ✅ Read from Zustand directly
// }
