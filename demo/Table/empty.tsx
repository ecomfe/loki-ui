/**
 * description: 支持自定义empty状态，支持自定义最小高度
 */

import React from 'react';
import {Table, TableCell, TableHead} from 'loki-ui';
import {
    ColumnDef,
} from '@tanstack/react-table';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
}

const App: React.FC = () => {
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
        <Table
            columns={columns}
            dataSource={[] as Person[]}
            loading={false}
            pagination={{
                pageSize: 5,
                total: 0,
                hideOnSinglePage: true,
            }}
            minHeight={200}
        />
    );
};

export default App;
