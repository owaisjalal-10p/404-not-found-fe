export interface Loe{
    name: string;
}

export interface TechStack{
    name: string;
}

export interface Team {

    name: string,
    dateOfLastLOE: string,
    numberOfLOEsThisYear: number,
    employmentType: string,
    onBench: boolean
}

export interface ProjectData {
    clientName: string;
    projectName: string;
    loeType: any;
    description: string;
    techStack: Array<any>;
    attachment?: Attachment;
    team?: Team[];
    architect?: Team | any;
}

interface Attachment {
    name: string;
    url: string;
}
