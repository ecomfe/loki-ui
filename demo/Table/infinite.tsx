/**
 * description: 实现无限滚动的效果
 */

import React, {useRef, useEffect} from 'react';
import {Loading, Table, TableCell, TableHead} from 'loki-ui';
import {ColumnDef} from '@tanstack/react-table';
import {faker} from '@faker-js/faker';
import useEvent from 'loki-ui/dist/_hooks/useEvent';

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
            res(makeData(6));
        }, 1000);
    });
};
const App: React.FC = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const containerRef = useRef(null);

    const handleScroll = useEvent(() => {
        if (loading) {
            return;
        }
        const container = containerRef.current;
        if (container.scrollHeight - container.scrollTop - container.clientHeight < 10) {
            // 触发请求的逻辑
            // 在这里可以执行你的请求操作
            setLoading(true);
            fetchData().then(res => {
                setData([...data, ...res]);
                setLoading(false);
            });
        }
    });

    useEffect(
        () => {
            setLoading(true);
            fetchData().then(res => {
                setData(res);
                setLoading(false);
            });
        },
        []
    );

    useEffect(
        () => {
            const container = containerRef.current;
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        },
        []
    );


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
    return (
        <div className="p-8">
            <Table
                columns={columns}
                dataSource={data}
                sticky
                pagination={null}
                minHeight={200}
                maxHeight={300}
                scrollRef={containerRef}
                loading={loading}
                loadingIcon={(
                    <Loading
                        className="w-20 h-20"
                        src="https://pic.rmb.bdstatic.com/ea4a3fb21fbe609806bd6d0a1e5de0ce.png"
                    />
                )}
            />
        </div>
    );
};

export default App;
