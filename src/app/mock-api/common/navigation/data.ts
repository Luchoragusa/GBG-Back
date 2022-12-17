/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/example'
    },
    {
        id   : 'autopart',
        title: 'Repuestos',
        type : 'basic',
        icon : 'heroicons_outline:search',
        link : '/autopart'
    },
];









// No se usa, pero si la borro me rompe todo

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/home'
    },
];