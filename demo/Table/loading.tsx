import React, {useEffect} from 'react';
import {Table, TableCell, TableHead} from 'loki-ui';
import {ColumnDef,} from '@tanstack/react-table';
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
const fetchData = (): Promise<Person[]> => {
    return new Promise(res => {
        setTimeout(() => {
            res(makeData(10));
        }, 2000);
    });
};
const App: React.FC = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const columns = React.useMemo<Array<ColumnDef<Person>>>(
        () => [
            {
                accessorKey: 'firstName',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>firstName</TableHead>
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead><span>Last Name</span></TableHead>
            },
            {
                accessorKey: 'age',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>Age</TableHead>,
            },

            {
                accessorKey: 'visits',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <span>Visits</span>,
            },
            {
                accessorKey: 'status',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>Age</TableHead>,
            },
            {
                accessorKey: 'progress',
                cell: info => <TableCell>{info.getValue()}</TableCell>,
                header: () => <TableHead>Profile Progress</TableHead>,
            },
        ],
        []
    );
    const handlePageChange = () => {
        setLoading(true);
        fetchData().then(d => {
            setData(d);
            setLoading(false);
        });
    };
    useEffect(
        () => {
            fetchData().then(d => {
                setData(d);
            });
        },
        []
    );
    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
                defaultCurrent: 1,
                pageSize: 10,
                total: 100,
                onChange: handlePageChange
            }}
            minHeight={400}
        />
    );
};

export default App;
