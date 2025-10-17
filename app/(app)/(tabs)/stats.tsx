import { ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { AppTheme } from "../../../lib/theme";

export default function Stats() {
  const theme = useTheme() as AppTheme;

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={[theme.styles.container, { paddingBottom: 40 }]}
    >
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface, marginBottom: 8 }}
          >
            Overview
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            This is the stats page. Here you can view various statistics and
            metrics.
          </Text>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface, marginBottom: 8 }}
          >
            Quick Stats
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Total Users: 0
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Active Sessions: 0
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Data Points: 0
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
