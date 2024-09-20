"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Post } from "@/http/http";
import { useState } from "react";
import Image from "next/image";
import Send from "@/assets/paper-plane-regular.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  sender: "user" | "ai";
  content: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  let [status, setStatus] = useState<boolean>(false);
  let [dialogStatus, setdialogStatus] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent, input_value: string) {
    event.preventDefault();
    if (input_value == "" || input_value == null) {
      setdialogStatus(true);
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: inputValue },
    ]);

    setInputValue("");
    setStatus(true);
    const response = await Post("predict", input_value);
    setStatus(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "ai", content: response.prediction },
    ]);
  }

  return (
    <main>
      <div className="flex min-h-screen bg-gray-950 items-center justify-center">
        <Card className="w-[500px] h-[800px] grid grid-rows-[min-content_1fr_min-content]">
          <CardHeader>
            <CardTitle className="flex justify-center items-center">
              AI Chatbot
            </CardTitle>
            <CardDescription className="flex justify-center items-center">
              Using Next.js | shadcn.ui | HuggingFace models
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className="flex gap-3 text-slate-600 text-sm">
                <Avatar>
                  <AvatarFallback>
                    {message.sender === "user" ? "User" : "AI"}
                  </AvatarFallback>
                  <AvatarImage
                    src={
                      message.sender === "user"
                        ? "https://cdn-icons-png.flaticon.com/512/706/706807.png"
                        : "https://cdn.pixabay.com/photo/2017/03/31/23/11/robot-2192617_960_720.png"
                    }
                  />
                </Avatar>
                <p className="mt-2 leading-relaxed">{message.content}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <form
              className="w-full gap-4 flex items-center justify-center"
              onSubmit={(e) => handleSubmit(e, inputValue)}
            >
              <Input
                disabled={status}
                placeholder="How can I help you today ?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button disabled={status} type="submit">
                <Image
                  src={Send}
                  alt="Send"
                  width={20}
                  className="font-white"
                />
              </Button>
            </form>
          </CardFooter>
          <Dialog open={dialogStatus} onOpenChange={setdialogStatus}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>INVALID TEXT</DialogTitle>
                <DialogDescription>
                  Please, enter a valid message!
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </main>
  );
}
