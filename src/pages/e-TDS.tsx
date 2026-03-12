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
import { ETDSFilingForm } from '../components/ETDSFilingForm';

interface ETDSRecord {
  id: number;
  tanNumber: string;
  deducteePan: string;
  formType: string;
  quarter: string;
  financialYear: string;
  tdsAmount: string;
  status: string;
}

const initialData: ETDSRecord[] = [
  {
    id: 1,
    tanNumber: 'KOLM12345P',
    deducteePan: 'ABCDE1234F',
    formType: '26Q',
    quarter: 'Q4',
    financialYear: '2024-25',
    tdsAmount: '₹18,500',
    status: 'Filed',
  },
  {
    id: 2,
    tanNumber: 'MUMS98765R',
    deducteePan: 'FGHIJ5678K',
    formType: '24Q',
    quarter: 'Q3',
    financialYear: '2024-25',
    tdsAmount: '₹32,000',
    status: 'Pending',
  },
  {
    id: 3,
    tanNumber: 'DELL45612T',
    deducteePan: 'LMNOP9012L',
    formType: '27Q',
    quarter: 'Q2',
    financialYear: '2025-26',
    tdsAmount: '₹9,750',
    status: 'Processed',
  },
];

export const ETDSPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState<ETDSRecord[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = (values: {
    tanNumber: string; deducteePan: string; formType: string;
    quarter: string; financialYear: string; tdsAmount: number;
  }) => {
    const newRecord: ETDSRecord = {
      id: records.length + 1,
      tanNumber: values.tanNumber || '—',
      deducteePan: values.deducteePan || '—',
      formType: values.formType || '26Q',
      quarter: values.quarter || 'Q4',
      financialYear: values.financialYear || '2025-26',
      tdsAmount: values.tdsAmount ? `₹${values.tdsAmount.toLocaleString()}` : '₹0',
      status: 'Pending',
    };
    setRecords((prev) => [newRecord, ...prev]);
    close();
  };

  const filtered = records.filter((r) =>
    r.tanNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.deducteePan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.formType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColor = (s: string) =>
    s === 'Filed' ? 'blue' : s === 'Processed' ? 'green' : 'orange';

  return (
    <Box p="md">
      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb="lg" wrap="wrap" gap="md">
        {/* Left: Title + Buttons */}
        <Box>
          <Title order={3} c="blue.6" style={{ letterSpacing: '0.5px' }} mb="xs">e-TDS</Title>
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
              <Table.Th>TAN No.</Table.Th>
              <Table.Th>Deductee PAN</Table.Th>
              <Table.Th>Form Type</Table.Th>
              <Table.Th>Quarter</Table.Th>
              <Table.Th>Financial Year</Table.Th>
              <Table.Th>TDS Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((r) => (
              <Table.Tr key={r.id}>
                <Table.Td fw={500}>{r.tanNumber}</Table.Td>
                <Table.Td>{r.deducteePan}</Table.Td>
                <Table.Td>{r.formType}</Table.Td>
                <Table.Td>{r.quarter}</Table.Td>
                <Table.Td>{r.financialYear}</Table.Td>
                <Table.Td>{r.tdsAmount}</Table.Td>
                <Table.Td>
                  <Badge color={statusColor(r.status)} variant="dot">{r.status}</Badge>
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="blue" title="View">
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
        title={<Text fw={700} size="lg">e-TDS Return Entry</Text>}
        size="xl"
        centered
      >
        <ETDSFilingForm onSubmitSuccess={handleFormSubmit} />
      </Modal>
    </Box>
  );
};
