import React, { useEffect, useState } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { io } from "socket.io-client";

const Editor = () => {
  const [content, setContent] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    // @ts-ignore
    setSocket(socketInstance);

    socketInstance.on("receive-changes", (changes) => {
      setContent(changes);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    // @ts-ignore
    socket.emit("send-changes", newContent);
  };

  return (
    <div>
      <TinyMCEEditor
        apiKey="09ncpnpfrczz3jtinre6a0eyokklxj54xreacq0fge9dhv0z"
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }}
      />
    </div>
  );
};

export default Editor;
