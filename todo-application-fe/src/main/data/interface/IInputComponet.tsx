export interface IInputComponent {
    label: String;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | String) => void;
    value?: string | readonly string[] | number | undefined;
}
