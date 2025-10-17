import { ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { AppTheme } from "../../../lib/theme";

export default function Stats2() {
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
            Detailed Analytics
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            This is the advanced stats page with more detailed analytics and
            insights.
          </Text>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface, marginBottom: 8 }}
          >
            Performance Metrics
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Response Time: 0ms
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Success Rate: 100%
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Error Rate: 0%
          </Text>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface, marginBottom: 8 }}
          >
            Trends
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Daily Growth: +0%
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Weekly Growth: +0%
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            • Monthly Growth: +0%
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
