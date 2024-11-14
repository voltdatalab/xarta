import { stateWrapper } from "./stateWrapper";

export const enqueueTokenCallback = () => {

    let outerResolve: (value: string) => void;

    const tokenPromise = new Promise<string>((resolve, reject) => {
        outerResolve = resolve;
    });

    const onDone = (token: string) => {
        outerResolve(token);
    };

    stateWrapper.queue.push(onDone);

    return tokenPromise;
};
