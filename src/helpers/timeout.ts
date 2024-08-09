export function promisedTimeout<TResult = any>(timeoutMs = 0, result?: TResult, rejectResult = false) {
    return new Promise<TResult>((resolve, reject) => {
        const promiseFinisher = rejectResult ? reject : resolve;
        setTimeout(() => {
            promiseFinisher(result as any);
        }, timeoutMs);
    });
}