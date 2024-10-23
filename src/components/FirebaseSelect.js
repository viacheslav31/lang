import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firabaseConfig";
const { Option } = Select;

const FirebaseSelect = ({tableName,field,defOptionsValue,defOptionsLabel,onChange}) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState([{value: defOptionsValue, label: defOptionsLabel}]);

    // Функция для загрузки данных из Firestore
    const fetchOptions = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(fireDB, tableName)); // Замените "items" на вашу коллекцию
            const optionsData = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();  // Получаем данные документа
                console.log("Document Data:", data);  // Выводим данные документа для отладки

                // Проверяем, что данные существуют и поле name присутствует
                if (data && data[field]) {
                    optionsData.push({
                        value: doc.id,
                        label: data[field],
                    });
                } else {
                    console.warn(`Document with ID: ${doc.id} does not contain ${field} field`);
                    // Обработка случая, если поле "name" отсутствует
                    optionsData.push({
                        value: doc.id,
                        label: `No ${field} Available`,
                    });
                }
            });

            setOptions(optionsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        fetchOptions();
    }, []);

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
            filterOption={(input, option) => {
                // Добавляем проверку на существование option.label
                const label = option?.props?.children || ""; // Получаем текст опции, если он существует
                return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
        >
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default FirebaseSelect;
