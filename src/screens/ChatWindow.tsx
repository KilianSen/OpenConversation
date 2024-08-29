import {Card, CardBody, CardHeader} from "@nextui-org/react";

export function ChatWindow() {
    return <div
        className={"absolute z-50 bottom-0 w-full flex justify-center px-10 py-5"}
    >
        <Card className={"min-w-[50%]"}>
            <CardHeader>
                Chat Window
            </CardHeader>
            <CardBody>
                123
            </CardBody>
        </Card>
    </div>
}