import React, {useEffect, useState} from 'react';
import {sendNotification} from "@tauri-apps/api/notification";
import {ask} from "@tauri-apps/api/dialog";

const DEFAULT_TIME = 1500;

const App: React.FC = () => {
    const [time, setTime] = useState<number>(DEFAULT_TIME);
    const [timer, setTimer] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!timer) return;

            if (time > 0) {
                setTime(t => t - 1);
                return;
            }

            if (time === 0) {
                sendNotification({
                    title: "Time's up!",
                    body: "Pomodoro timer is over."
                });
                ask("Pomodoro timer is over.", {
                    title: "Time's up!", type: "info"
                });
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [time, timer]);

    const handleTimerToggle = () => {
        setTimer(v => !v);
    }

    const handleTimerReset = () => {
        setTimer(false);
        setTime(DEFAULT_TIME);
    }

    const formatTime = (time: number): string => {
        return (
            `${Math.floor(time / 60) < 10 
                ? `0${Math.floor(time / 60)}` 
                : `${Math.floor(time / 60)}`
            }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
        );
    }

    return (
        <div className={"h-screen bg-[#282c34] text-white flex flex-col items-center justify-center"}>
            <h1 className={"text-4xl font-bold"}>
                Pomodoro Timer
            </h1>

            <p className={"text-lg"}>
                A simple Pomodoro timer.
            </p>

            <p className={"text-5xl font-bold my-4"}>
                {formatTime(time)}
            </p>

            <div className={"flex space-x-4 justify-center items-center"}>
                <button
                    className={"py-2 px-4 m-2 text-bold text-lg border-2 border-green-500 rounded-lg"}
                    onClick={handleTimerToggle}
                >
                    {timer ? "Stop" : "Start"}
                </button>

                <button
                    className={"py-2 px-4 m-2 text-bold text-lg border-2 border-red-500 rounded-lg"}
                    onClick={handleTimerReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
