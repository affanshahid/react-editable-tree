import { convertToState } from './utils';

export const fetchConfigs = () => {
    return fetch(`/configs`).then(res => {
        return res.json();
    }).then(convertToState);
}