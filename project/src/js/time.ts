class Program_Timer{
    private timer;

    /**
     * timer_start
     */
    public timer_start() {
        this.timer = new Date().getTime();
    }

    /**
     * timer_stop
     */
    public timer_stop() {
        return new Date().getTime() - this.timer;
    }
}