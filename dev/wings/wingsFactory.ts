class WingsFactory {
    public getWings(wingName: string) {
        switch (wingName) {
            case 'scary':
                return new ScaryWing();
            case 'fairy':
                return new FairyWing();
            case 'normal':
                return new NormalWing();
            default:
                // IF SOMETHING IS WRONG WE ALWAYS RETURN NORMAL WINGS.
                return new NormalWing();
        }
    }
}