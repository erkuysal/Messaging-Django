import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {useCallback, useEffect, useRef} from "react";

interface ScrollProps {
    children: React.ReactNode;
    "&::-webkit-scrollbar": {
      width: "5 px";
      height: "5px";
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888";
      borderRadius: "5px";
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#ffe27f";
    },
    "&::-webkit-scrollbar-track": {
      // backgroundColor: "#888";
    },
    "&::-webkit-scrollbar-corner": {
      backgroundColor: "transparent";
    },
}

const ScrollContainer = styled(Box)(() => ({
    height: `calc(100vh - 190px)`,
    overflowY: "scroll",
}))


const Scroll = ({children} : ScrollProps) => {
    const ScrollRef = useRef<HTMLDivElement>(null);

    const ScrollToBottom = useCallback(() => {
        if(ScrollRef.current){
            ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
        }
    }, [])

    useEffect(() => {
        ScrollToBottom();
    }, [ScrollToBottom, children]);

    return(
        <ScrollContainer ref={ScrollRef}>
            {children}
        </ScrollContainer>
    )
}

export default Scroll;