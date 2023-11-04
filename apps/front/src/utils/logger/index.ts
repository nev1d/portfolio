class Logger {
    private colorizeText = (text: string) => {
        return [`%c ${text} `, 'background: #1d1d20; color: #d1d1d1'];
    };

    public success = (text: string) => {
        console.log(...this.colorizeText(text));
    };

    public error = (text: string) => {
        console.error(...this.colorizeText(`ERROR: ${text}`));
    };
}

export default new Logger();
