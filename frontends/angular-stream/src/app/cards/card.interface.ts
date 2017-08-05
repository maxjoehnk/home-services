export interface ICardStyle {
    color?: string;
}

export interface ICard {
    type: string;
    payload: any;
    style?: ICardStyle;
}
