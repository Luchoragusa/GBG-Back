/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const compactNavigation: FuseNavigationItem[] = [
    // {
    //     id   : 'dashboard',
    //     title: 'Dashboard',
    //     type : 'basic',
    //     icon : 'heroicons_outline:home',
    //     link : '/dashboard'
    // },
    {
        id   : 'autopart',
        title: 'Repuestos',
        type : 'basic',
        icon : 'heroicons_outline:search',
        link : '/autopart'
    },
    {
        id   : 'part-type',
        title: 'Tipos de repuestos',
        type : 'basic',
        icon : 'settings',
        link : '/part-type'
    },
    {
        id   : 'part-brand',
        title: 'Marcas de repuestos',
        type : 'basic',
        icon : 'settings',
        link : '/part-brand'
    },
    {
        id   : 'car-brand',
        title: 'Marcas de Autos',
        type : 'basic',
        icon : 'directions_car_filled',
        link : '/car-brand'
    }
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