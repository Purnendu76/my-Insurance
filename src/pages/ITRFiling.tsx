import { useState, useRef } from 'react';
import {
  Box, Button, Flex, Modal, Text, Title, Paper,
  Table, Badge, ActionIcon, TextInput, Group, Stack
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus, IconEye, IconSearch, IconFilter,
  IconUpload, IconFileSpreadsheet
} from '@tabler/icons-react';
import { ITRFilingForm } from '../components/ITRFilingForm';

interface ITRRecord {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  bankName: string;
  accountNumber: string;
  status: string;
}

const initialData: ITRRecord[] = [
  {
    id: 1,
    name: 'Rahul Kumar',
    phone: '9876543210',
    email: 'rahul@gmail.com',
    city: 'Hyderabad',
    bankName: 'HDFC Bank',
    accountNumber: '50100XXXX1234',
    status: 'Submitted',
  },
  {
    id: 2,
    name: 'Sneha Patil',
    phone: '9988776655',
    email: 'sneha@gmail.com',
    city: 'Pune',
    bankName: 'ICICI Bank',
    accountNumber: '00201XXXX5678',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Ajay Singh',
    phone: '9123456789',
    email: 'ajay@yahoo.com',
    city: 'Delhi',
    bankName: 'SBI',
    accountNumber: '31209XXXX9012',
    status: 'Processed',
  },
];

const ITRFiling = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState<ITRRecord[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = (values: {
    name: string; email: string; phone: string; city: string;
    bankName: string; accountNumber: string;
  }) => {
    const newRecord: ITRRecord = {
      id: records.length + 1,
      name: values.name,
      phone: values.phone,
      email: values.email,
      city: values.city,
      bankName: values.bankName,
      accountNumber: values.accountNumber || '—',
      status: 'Pending',
    };
    setRecords((prev) => [newRecord, ...prev]);
    close();
  };

  const filtered = records.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone.includes(searchQuery) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColor = (s: string) =>
    s === 'Submitted' ? 'blue' : s === 'Processed' ? 'green' : 'orange';

  return (
    <Box p="md">
      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb="lg" wrap="wrap" gap="md">
        {/* Left: Title + Buttons */}
        <Box>
          <Title order={3} c="blue.6" style={{ letterSpacing: '0.5px' }} mb="xs">ITR FILING</Title>
          <Group gap="xs">
            <Button leftSection={<IconFilter size={16} />} color="green.8">Filter</Button>
            <Button leftSection={<IconPlus size={16} />} color="green.8" onClick={open}>Add New</Button>
            <Button leftSection={<IconUpload size={16} />} color="green.8" onClick={openUpload}>Upload</Button>
            <Button leftSection={<IconFileSpreadsheet size={16} />} color="blue.7">Create Sheet</Button>
          </Group>
        </Box>

        {/* Right: Search */}
        <Group gap="xs" align="flex-end">
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ width: 260 }}
          />
          <Button leftSection={<IconSearch size={16} />} variant="filled">Search</Button>
        </Group>
      </Flex>

      {/* Table */}
      <Paper withBorder shadow="md" radius="md" p="md" mt="20px">
        <Table horizontalSpacing="md" verticalSpacing="md" striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead bg="gray.1">
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>City</Table.Th>
              <Table.Th>Bank Name</Table.Th>
              <Table.Th>Account No.</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((r) => (
              <Table.Tr key={r.id}>
                <Table.Td fw={500}>{r.name}</Table.Td>
                <Table.Td>{r.phone}</Table.Td>
                <Table.Td>{r.email}</Table.Td>
                <Table.Td>{r.city}</Table.Td>
                <Table.Td>{r.bankName}</Table.Td>
                <Table.Td>{r.accountNumber}</Table.Td>
                <Table.Td>
                  <Badge color={statusColor(r.status)} variant="dot">{r.status}</Badge>
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="blue" title="Preview">
                    <IconEye size="1.1rem" />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* Upload Modal */}
      <Modal
        opened={uploadOpened}
        onClose={closeUpload}
        title={<Text fw={700} size="lg">Upload File</Text>}
        centered
        radius="md"
        size="md"
      >
        <Stack gap="md" p="md">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".pdf,.xlsx,.csv"
            onChange={(e) => setUploadFileName(e.target.files?.[0]?.name ?? null)}
          />
          <Paper
            withBorder
            p="xl"
            radius="md"
            style={{
              borderStyle: 'dashed',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#f8f9fa'
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <IconUpload size={48} color="#1c7ed6" stroke={1.5} style={{ marginBottom: '10px' }} />
            <Text size="sm" fw={500}>
              {uploadFileName ? uploadFileName : 'Select File or Drag & Drop'}
            </Text>
            <Text size="xs" color="dimmed">Supported: .pdf, .xlsx, .csv (Max 5MB)</Text>
          </Paper>
          <Group justify="flex-end">
            <Button variant="light" color="gray" onClick={closeUpload}>Cancel</Button>
            <Button color="blue">Upload &amp; Process</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Add New Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={700} size="lg">ITR Filing</Text>}
        size="xl"
        centered
      >
        <ITRFilingForm onSubmitSuccess={handleFormSubmit} />
      </Modal>
    </Box>
  );
};

export default ITRFiling;
