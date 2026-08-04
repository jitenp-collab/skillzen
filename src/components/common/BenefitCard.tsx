import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme/Theme";
import type { BenefitCardProps } from "@/utils/types/Apptypes";

const BenefitCard = memo(
  ({ title, description, icon: Icon, cardWidth }: BenefitCardProps) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.iconWrap}>
        <Icon size={22} color={theme.colors.primary} strokeWidth={2.2} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  ),
);
BenefitCard.displayName = "BenefitCard";

export default BenefitCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    height: 76,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 18,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: theme.colors.primarySoft,
    marginRight: 14,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  textCol: { flex: 1 },
  title: {
    color: theme.colors.text,
    fontSize: 14.5,
    fontWeight: "700",
    marginBottom: 3,
    letterSpacing: 0.1,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});