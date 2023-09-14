type Keys = "username" | "password" | "email";

type Generic = { [K in Keys]: string };

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>>;
}[keyof T];

export type PostBody = Partial<Generic>;

export type Select = RequireAtLeastOne<Generic>;
