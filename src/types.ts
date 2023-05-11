export type User = {
    id: number;
    email: string;
    username: string;
    lastname: string;
    firstname: string;
    password: string;
    birthday: Date;
    description: string;
    faculty?: Faculty;
}

export type Message = {
    id: number;
    id_User: number;
    user?: User;
    id_conversation: number;
    content: string;
    pathMediaMess: string | null;
    responseMess: number | null;
    publishDate: string;
    params?: any;
};

export type Position = {
    x: number;
    y: number;
}

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