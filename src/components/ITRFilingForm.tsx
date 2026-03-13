import {
  TextInput,
  Button,
  Group,
  Grid,
  Text,
  Paper,
  Divider,
  FileInput,
  Stack,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconUser,
  IconMapPin,
  IconBuildingBank,
  IconUpload,
  IconCheck,
} from "@tabler/icons-react";

const labelStyle = {
  label: { color: "#495057", fontWeight: 600, fontSize: "13px" },
};

interface FormValues {
  name: string;
  email: string;
  phone: string;
  city: string;
  pincode: string;
  state: string;
  landmark: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  aadhaarFile: File | null;
  panFile: File | null;
  bankStatement: File | null;
}

interface ITRFilingFormProps {
  onSubmitSuccess?: (values: FormValues) => void;
}

export const ITRFilingForm = ({ onSubmitSuccess }: ITRFilingFormProps) => {
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      pincode: "",
      state: "",
      landmark: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      aadhaarFile: null,
      panFile: null,
      bankStatement: null,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value.length < 10 ? "Enter a valid phone number" : null,
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmitSuccess?.(values);
    notifications.show({
      title: 'ITR Filed Successfully',
      message: 'Your ITR details have been submitted.',
      color: 'teal',
      icon: <IconCheck size="1.1rem" />,
      autoClose: 4000,
    });
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg" p="sm">
        {/* Personal Details */}
        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="blue">
              <IconUser size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">
              Personal Details
            </Text>
          </Group>
          <Divider mb="lg" />
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Full Name"
                placeholder="Enter full name"
                withAsterisk
                {...form.getInputProps("name")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                withAsterisk
                {...form.getInputProps("email")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Phone Number"
                placeholder="10-digit mobile number"
                withAsterisk
                {...form.getInputProps("phone")}
                styles={labelStyle}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Address Details */}
        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="green">
              <IconMapPin size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">
              Address Details
            </Text>
          </Group>
          <Divider mb="lg" />
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="City"
                placeholder="City"
                withAsterisk
                {...form.getInputProps("city")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Pincode"
                placeholder="6-digit Pincode"
                withAsterisk
                {...form.getInputProps("pincode")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="State"
                placeholder="State"
                withAsterisk
                {...form.getInputProps("state")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Landmark"
                placeholder="Near XYZ"
                {...form.getInputProps("landmark")}
                styles={labelStyle}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Bank Details */}
        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="orange">
              <IconBuildingBank size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">
              Bank Details
            </Text>
          </Group>
          <Divider mb="lg" />
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Bank Name"
                placeholder="e.g. HDFC Bank"
                withAsterisk
                {...form.getInputProps("bankName")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Account Number"
                placeholder="Enter Account Number"
                withAsterisk
                {...form.getInputProps("accountNumber")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="IFSC Code"
                placeholder="HDFC0001234"
                withAsterisk
                {...form.getInputProps("ifscCode")}
                styles={labelStyle}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Document Uploads */}
        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="grape">
              <IconUpload size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">
              Upload Documents
            </Text>
          </Group>
          <Divider mb="lg" />
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <FileInput
                label="Upload Aadhaar"
                placeholder="PDF / Image"
                withAsterisk
                {...form.getInputProps("aadhaarFile")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <FileInput
                label="Upload PAN Card"
                placeholder="PDF / Image"
                withAsterisk
                {...form.getInputProps("panFile")}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <FileInput
                label="Bank Statement"
                placeholder="Last FY"
                withAsterisk
                {...form.getInputProps("bankStatement")}
                styles={labelStyle}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        <Group justify="flex-end">
          <Button type="submit" size="md" radius="md">
            Submit ITR Details
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
