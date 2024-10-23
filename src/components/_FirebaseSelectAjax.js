import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../firabaseConfig";

const { Option } = Select;

const FirebaseSelectAjax = ({tableName,field1,field2='',defOptionsValue,defOptionsLabel,onChange}) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState([{value: defOptionsValue, label: defOptionsLabel}]);

    // Функция для загрузки данных из Firestore
    const fetchOptions = async (searchValue) => {
        setLoading(true);
        try {

            //search field1
            let q = query(collection(fireDB, tableName),
                    where(field1, ">=", searchValue),
                    where(field1, "<=", searchValue + "\uf8ff"));

            let querySnapshot = await getDocs(q);
            const optionsData = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log("Document Data:", data); // Выводим данные документа для отладки

                // Проверяем, что данные существуют и поле 'field' присутствует
                if (data && data[field1]) {
                    optionsData.push({
                        value: doc.id,
                        label: field2 === '' ? data[field1] : data[field1] +' ['+ data[field2] + ']',
                    });
                } else {
                    console.warn(`Document with ID: ${doc.id} does not contain ${field1} field`);
                    optionsData.push({
                        value: doc.id,
                        label: `No ${field1} Available`,
                    });
                }
            });

            //search field2
            if (field2 !== '') {
                q = query(collection(fireDB, tableName),
                    where(field2, ">=", searchValue),
                    where(field2, "<=", searchValue + "\uf8ff"));
                    // .orderBy('email').startAt(searchValue).endAt(searchValue+"\uf8ff")

                querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    //console.log("Document Data:", data); // Выводим данные документа для отладки

                    // Проверяем, что данные существуют и поле 'field' присутствует
                    if (data && data[field2]) {

                        if (!(optionsData.find(item => item.value == doc.id) && true) || false) {
                            optionsData.push({
                                value: doc.id,
                                label: data[field1] +' ['+ data[field2] + ']',
                            });
                        }

                    } else {
                        console.warn(`Document with ID: ${doc.id} does not contain ${field2} field`);
                        optionsData.push({
                            value: doc.id,
                            label: `No ${field2} Available`,
                        });
                    }
                });
            }
            //res
            setOptions(optionsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    // Обработчик изменения выбранного значения
    const handleChange = (value) => {
        setSelectedValue(value);
        onChange(value);
        //console.log(`Selected: ${value}`);
    };

    return (
        <Select
            showSearch
            value={selectedValue}
            labelInValue
            placeholder="Select an item"
            optionFilterProp="children"
            onChange={handleChange}
            notFoundContent={loading ? <Spin size="small" /> : null}
            onSearch={fetchOptions} // Вызов функции для загрузки данных при вводе
            filterOption={false} // Отключаем стандартную фильтрацию
        >
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default FirebaseSelectAjax;
