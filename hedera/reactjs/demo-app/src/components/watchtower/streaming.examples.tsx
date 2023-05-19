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
import { BalanceRecord, TopicRecord } from "@/types/demo";
import FieldLink from "../generic/field.link";
import Long from "long";
import { Hbar, HbarUnit } from "@hashgraph/sdk";

interface Props {
    topicId: string;
    accountId: string;
}

function StreamingExamples (props: Props) {
    const theme = useTheme();
    // watchtower?api_key=your_api_key
    const socket = io(appConfig.arkhiaApi.getWatchtowerUrl());
    const [socketError, setSocketError] = useState(``);
    const [streamConnected, setStreamConnected] = useState(false);
    const [topicMessageCollection, setTopicMessageCollection] = useState<Array<TopicRecord>>([]);
    const [accountMessageCollection, setAccountMessageCollection] = useState<Array<BalanceRecord>>([]);
    const [statusStreaming, setStatusStreaming] = useState(``);
    const [balanceStatusStreaming, setBalanceStatusStreaming] = useState(``);

    const addBalanceMessageToCollection = (message: any) => {
        const balance = new Long(message.balance.low, message.balance.high, message.balance.unsigned);
        const messageObject: BalanceRecord = { 
            accountId: message.accountID.accountNum.low, 
            accountBalance: Hbar.from(balance, HbarUnit.Tinybar).toString(),
            accountTimestamp: new Date().toISOString()
        };
        setAccountMessageCollection(accountMessageCollection => [...accountMessageCollection, messageObject])
     
    }

    const addTopicMessageToCollection = (message: any) => {
        if (message.error) {
            console.error(message.error);
            return;
        }
        const messageObject: TopicRecord = { 
            topicMessage: message.data.message, 
            topicTimestamp: message.data.consensusTimestamp.seconds.low 
        };
        console.log(messageObject);
        setTopicMessageCollection(topicMessageCollection => [...topicMessageCollection, messageObject])
    }

    const subscribeToTopic = () => {
        setTopicMessageCollection([]);
        // get topic 
        const requestPayload = WatchtowerService.getTopicSubscriptionPayload(props.topicId, `100`);
   
        socket.emit(`subscribe`, requestPayload, (msg: any) => {    

            setStatusStreaming('Streaming & Listening...');

            socket.on(msg.listeners.data, function (message: any) {
                try {
                    if (message.error) {
                        console.log(`Error`);
                        console.log(message);
                        return;
                    }
                    addTopicMessageToCollection(message);
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

    const subscribeToAccountBalance = () => {

        console.log(`YEAH?`);
        console.log(appConfig.arkhiaApi.getWatchtowerUrl());
        console.log(socket);
        const requestPayload = WatchtowerService.getAccountSubscriptionPayload(props.accountId.toString());
        socket.emit(`subscribe`, requestPayload, (msg: any) => {           
            setBalanceStatusStreaming('Streaming & Listening Account Balance...');
            console.log(`payload`);
            console.log(requestPayload);

            console.log(`msg`);
            console.log(msg);
            socket.on(msg.listeners.data, function (message: any) {
                try {
                    if (message.error) {
                        console.log(`Error`);
                        console.log(message);
                        return;
                    }
                    console.log(`message`);
                    console.log(message)
                    addBalanceMessageToCollection(message.data.cryptogetAccountBalance);
                } catch(e) {
                    console.error(`Something went wrong with streaming the message down`);
                } 
            });
            socket.on(msg.listeners.error, function (message: any) {
                setSocketError(message);
                console.log(`Error`);
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
            <Divider>HCS Stream</Divider>
            <Box display={'flex'} justifyContent={`space-between`}>
                <FieldLink label='Topic Id' idValue={props.topicId.toString()}></FieldLink>
                <Button onClick={subscribeToTopic}>Subscribe Topic
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
                    topicMessageCollection.length > 0 && (
                        <ArkhiaDataGrid
                            minHeight='250px'
                            rowsData={DataGridService.getLedgerData(topicMessageCollection)}
                            columnDef={DataGridService.getLedgerColumns()}
                        />
                    )
                }
            </Box>
            <Divider>Account Balance</Divider>
            <Box display={'flex'} justifyContent={`space-between`}>
                <FieldLink label='Account Balance' idValue={props.accountId.toString()}></FieldLink>
                <Button onClick={subscribeToAccountBalance}>Subscribe Account 
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
                    balanceStatusStreaming && (
                        <Alert sx={{marginBottom: theme.spacing(2)}} severity="info">{balanceStatusStreaming}</Alert>
                    )
                }
                {
                    accountMessageCollection.length > 0 && (
                        <ArkhiaDataGrid
                            minHeight='250px'
                            rowsData={DataGridService.getAccountWatchtowerData(accountMessageCollection)}
                            columnDef={DataGridService.getAccountWatchtowerColumns()}
                        />
                    )
                }
            </Box>
        </>
    );
}

export default StreamingExamples;
