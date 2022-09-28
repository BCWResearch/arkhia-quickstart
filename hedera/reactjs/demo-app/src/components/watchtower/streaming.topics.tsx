import Button from "../theme/button";
import appConfig from "@/config/appConfig";
import { Alert, Box, Divider, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import { WatchtowerService } from "@/handlers/apis/watchtower.api.service";
import WifiPasswordIcon from '@mui/icons-material/WifiPassword';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { DataGridService } from "@/handlers/data.grid.service";
import ArkhiaDataGrid from "../generic/data.grid";
import { CoffeeDonationRecord } from "@/types/demo";
import FieldLink from "../generic/field.link";

interface Props {
    topicId: string;
}

function Streaming (props: Props) {
    const theme = useTheme();
    // watchtower?api_key=your_api_key
    const socket = io(appConfig.arkhiaApi.getWatchtowerUrl());
    const [socketError, setSocketError] = useState(``);
    const [streamConnected, setStreamConnected] = useState(false);
    const [messageCollection, setMessageCollection] = useState<Array<CoffeeDonationRecord>>([]);
    const [statusStreaming, setStatusStreaming] = useState(``);

    console.log(`Watchtower url`);
    console.log(appConfig.arkhiaApi.getWatchtowerUrl());

    const addMessageToCollection = (message: any) => {
        if (message.error) {
            console.error(message.error);
            return;
        }
        const messageObject: CoffeeDonationRecord = { 
            topicMessage: message.data.message, 
            topicTimestamp: message.data.consensusTimestamp.seconds.low 
        };
        console.log(messageObject);
        setMessageCollection(messageCollection => [...messageCollection, messageObject])
    }

    const subscribeToTopic = () => {
        setMessageCollection([]);
        // get topic 
        const requestPayload = WatchtowerService.getTopicSubscriptionPayload(props.topicId, `100`);
   
        socket.emit(`subscribe`, requestPayload, (msg: any) => {    

            setStatusStreaming('Streaming & Listening...');

            socket.on(msg.listeners.data, function (message: any) {
                try {
                    if (message.error) return;
                    console.log(`message`);
                    console.log(message)
                    addMessageToCollection(message);
                } catch(e) {
                    console.error(`Something went wrong with streaming the message down`);
                } 
            });
        
            socket.on(msg.listeners.error, function (message: any) {
                console.log(`Listener issue`);
                console.log(message)
            });
        });

    };

    useEffect(() => {

        socket.on(`connect`, () => {
            setStreamConnected(true);
            socket.on(`status`, (msg) => {
                console.log(`status`, msg);
            });
            socket.emit(`list-services`, (services: any) => {
                console.log(`services`, services);
            });
        });
        socket.on(`disconnect`, () => {
            setStreamConnected(false);
        });

        socket.on(`error`, (message) => {
            setSocketError(message);
        })
  
    }, []);

    return (
        <>
            <Typography variant="h3">Watchtower</Typography> 
            <Box display={'flex'} justifyContent={`space-between`}>
                <FieldLink label='Topic Id' idValue={props.topicId.toString()}></FieldLink>
                <Button onClick={subscribeToTopic}>Subscribe 
                    { streamConnected ?
                            <WifiPasswordIcon></WifiPasswordIcon> :  <WifiOffIcon></WifiOffIcon>
                    }
                </Button>
            </Box>
            <Divider></Divider>
            <Box justifyContent={`center`}>
                {
                    socketError && (
                        <Alert severity="error">{socketError}</Alert>
                    )
                }
                {
                    statusStreaming && (
                        <Alert sx={{marginBottom: theme.spacing(2)}} severity="info">{statusStreaming}</Alert>
                    )
                }
                {
                    messageCollection.length > 0 && (
                        <ArkhiaDataGrid
                            minHeight='250px'
                            rowsData={DataGridService.getLedgerData(messageCollection)}
                            columnDef={DataGridService.getLedgerColumns()}
                        />
                    )
                }
            </Box>
        </>
    );
}

export default Streaming;
