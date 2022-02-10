export interface IRoute{
    title: string,
    path: string,
    exact: boolean,
    component: any,
    props?:any
}