import { KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';

export default function KeyboardAvoidingViewWrapper({ children }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
