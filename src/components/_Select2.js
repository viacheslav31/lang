import React, { useMemo, useRef, useState, useEffect } from 'react';
import {message, Select, Spin} from 'antd';
import debounce from 'lodash/debounce';
import {getDataAjax} from "../apis/firebase";
import {HideLoading, ShowLoading} from "../redux/alertSlice";
import {getApplicationsByUserId} from "../apis/jobs";

function DebounceSelect({ fetchOptions, debounceTimeout = 800, defOptionsValue,defOptionsLabel,onChange, ...props }) {
    //console.log('props', props);

    // useEffect(() => {
    //     setSelectedValue({value:'aaa1', label: 'bbb1'});
    // }, []);


    const handleChange = value => {
        //console.log('value3333',value.label)
        setSelectedValue(value);
        onChange(value);
        //onChange(value.label);
    };

    const [selectedValue, setSelectedValue] = useState([{value: defOptionsValue, label: defOptionsLabel}]);

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const fetchRef = useRef(0);

    // Usage of DebounceSelect

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            value={selectedValue}
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            onChange={handleChange}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

async function fetchList(username) {
    //console.log('fetching user', username);
    return fetch('https://randomuser.me/api/?results=100')
        .then((response) => response.json())
        .then((body) =>
            body.results.map((user) => ({
                label: `${user.name.first} ${user.name.last}`,
                value: user.login.username,
            })),
        );
}
const Select2 = ({tableName,defOptionsValue,defOptionsLabel,onChange}) => {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            //const user = JSON.parse(localStorage.getItem("user"));
            const response = await getDataAjax("users","name","user1");
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            message.error(error.message);
        }
    };


    //const [value, setValue] = useState([]);
    return (
        <DebounceSelect
            // mode="multiple"
            showSearch
            //value={value}
            placeholder="Select users"
            //fetchOptions={fetchList}
            fetchOptions={data}
            //onChange={(newValue) => {setValue(newValue);}}
            defOptionsValue={defOptionsValue}
            defOptionsLabel={defOptionsLabel}
            placeholder="Select ..."
            onChange={onChange}
            style={{
                width: '100%',
            }}
        />
    );
};
export default Select2;
