import os from 'os';

/**
 * Describes the host model.
 */
export default class HostModel {
    /**
     * The host name.
     */
    public readonly hostname: string;
    /**
     * The host platform.
     */
    public readonly platform: string;

    /**
     * Initializes the host model.
     */
    public constructor() {
        this.hostname = os.hostname();
        this.platform = os.platform();
    }
}
