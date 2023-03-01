export type User = {
    idUser: number;
    email: string;
    pseudo: string;
    lastname: string;
    firstname: string;
    password: string;
    birthday: Date;
    pathPP: string | null;
    faculty: Faculty;
}

export type UserMessage = {
    idUser: number;
    lastname: string;
    firstname: string;
}

export type Message = {
    userSend: UserMessage;
    userReceive: UserMessage;
    content: string;
    pathMediaMess: string | null;
    responseMess: string | null;
    view: boolean;
    publishDate: string;
};

export type Faculty = {
    idFaculty: number;
    nameFaculty: string;
}

export type UserPost = {
    idUser: number;
    lastname: string;
    firstname: string;
    pseudo: string;
}

export type Post = {
    idPost: number;
    user: UserPost;
    publishDate: string | Date;
    content: string;
    pathMedia: string | null;
}

export type Comment = {
    idPost: number;
    user: UserPost;
    idComment: number;
    publishDate: string | Date;
    content: string;
}