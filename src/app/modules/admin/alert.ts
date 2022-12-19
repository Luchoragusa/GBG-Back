export interface alert{
    title: string;
    message: string;
    icon: {
        show: boolean;
        name: string;
        color: string;
    };
    actions: {
        confirm: {
            show: boolean;
            label: string;
            color: string;
        };
        cancel: {
            show: boolean;
            label: string;
        };
    };
}

