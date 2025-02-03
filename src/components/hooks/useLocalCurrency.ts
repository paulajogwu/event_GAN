import { useEffect, useState } from "react";

export default function useLocalCurrency() {
    const [localCurrency, setLocalCurrency] = useState('');

    useEffect(() => {
        // const currency = navigator.language.split('-')[1];
        setLocalCurrency('USD');
    }, []);

    return localCurrency;
}