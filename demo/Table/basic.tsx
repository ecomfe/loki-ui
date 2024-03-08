/**
 * title: 基础示例
 * description: Table是基于 [headless table](https://tanstack.com/table/latest) 构建, 默认使用Pagination分页，传递null不展示分页器
 */

import React, {useState} from 'react';
import {Table, TableCell, TableHead, Switch} from 'loki-ui';
import {
    ColumnDef,
} from '@tanstack/react-table';
import {faker} from '@faker-js/faker';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
}

const range = (len: number) => {
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = (): Person => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int(40),
        visits: faker.number.int(1000),
        progress: faker.number.int(100),
        status: faker.helpers.shuffle<Person['status']>([
            'relationship',
            'complicated',
            'single',
        ])[0]!,
    };
};

function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!;
        return range(len).map((d): Person => {
            return newPerson();
        });
    };

    return makeDataLevel();
}
const dataLen = 10;
const PageConfig = {
    defaultCurrent: 1,
    pageSize: 5,
    hideOnSinglePage: true,
    total: dataLen,
};
const App: React.FC = () => {
    const [data, setData] = React.useState<Person[]>(() => makeData(dataLen));
    const [pageInfo, setPageInfo] = useState(PageConfig);
    const columns = React.useMemo<Array<ColumnDef<Person>>>(
        () => [
            {
                accessorKey: 'firstName',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead><span>Last Name</span></TableHead>,
            },
            {
                accessorKey: 'age',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>age</TableHead>,
            },

            {
                accessorKey: 'visits',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>visits</TableHead>,
            },
            {
                accessorKey: 'status',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>status</TableHead>,
            },
            {
                accessorKey: 'progress',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>Profile Progress</TableHead>,
            },
        ],
        []
    );
    const handleSwitchChange = val => {
        if (val) {
            setPageInfo(PageConfig);
        } else {
            setPageInfo(null);
        }
    };
    return (
        <div>
            <span className="inline-flex items-center gap-2 pb-2">
                是否展示Pagination
                <Switch defaultValue onChange={handleSwitchChange} />
            </span>
            <Table
                columns={columns}
                dataSource={data}
                loading={false}
                pagination={pageInfo}
            />
        </div>
    );
};

export default App;
