import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

interface TransactionItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

export default function DashboardScreen() {
  // Mock data for demonstration
  const accountBalance = 5250000;
  const loanBalance = 2000000;
  
  const recentTransactions: TransactionItem[] = [
    {
      id: 'tx1',
      date: '12 Apr 2025',
      description: 'Setoran Tunai',
      amount: 500000,
      type: 'credit'
    },
    {
      id: 'tx2',
      date: '10 Apr 2025',
      description: 'Penarikan Tunai',
      amount: 250000,
      type: 'debit'
    },
    {
      id: 'tx3',
      date: '05 Apr 2025',
      description: 'Angsuran Pembiayaan',
      amount: 350000,
      type: 'debit'
    },
    {
      id: 'tx4',
      date: '01 Apr 2025',
      description: 'Bagi Hasil',
      amount: 75000,
      type: 'credit'
    },
    {
      id: 'tx5',
      date: '28 Mar 2025',
      description: 'Setoran Tunai',
      amount: 1000000,
      type: 'credit'
    }
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Assalamu'alaikum</Text>
        <Text style={styles.userName}>Abdullah</Text>
        
        <View style={styles.lastUpdateContainer}>
          <Text style={styles.lastUpdateText}>
            Last updated: 12/04/2025 15:00
          </Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Savings Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(accountBalance)}</Text>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Loan Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(loanBalance)}</Text>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>💰</Text>
              </View>
              <Text style={styles.quickActionText}>Transfer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📝</Text>
              </View>
              <Text style={styles.quickActionText}>Payment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📊</Text>
              </View>
              <Text style={styles.quickActionText}>History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>🏦</Text>
              </View>
              <Text style={styles.quickActionText}>Loan</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
              </View>
              
              <Text 
                style={[
                  styles.transactionAmount,
                  transaction.type === 'credit' ? styles.creditAmount : styles.debitAmount
                ]}
              >
                {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.announcementsSection}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          
          <View style={styles.announcementCard}>
            <Text style={styles.announcementTitle}>Office Closed for Eid</Text>
            <Text style={styles.announcementDate}>10 Apr 2025</Text>
            <Text style={styles.announcementContent}>
              Our office will be closed from April 15-18, 2025 for Eid al-Fitr. Normal operations will resume on April 19, 2025.
            </Text>
          </View>
          
          <View style={styles.announcementCard}>
            <Text style={styles.announcementTitle}>New Financing Program</Text>
            <Text style={styles.announcementDate}>05 Apr 2025</Text>
            <Text style={styles.announcementContent}>
              We're launching a new micro-business financing program with competitive rates. Visit our office for more information.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>🏠</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💼</Text>
          <Text style={styles.navText}>Accounts</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#007BFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  lastUpdateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  lastUpdateText: {
    fontSize: 12,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#007BFF',
  },
  quickActionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionIconText: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 14,
    color: '#333',
  },
  transactionsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#007BFF',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  creditAmount: {
    color: '#4CAF50',
  },
  debitAmount: {
    color: '#F44336',
  },
  announcementsSection: {
    marginBottom: 20,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  announcementDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  announcementContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
    color: '#999',
  },
  activeNavIcon: {
    color: '#007BFF',
  },
  navText: {
    fontSize: 12,
    color: '#999',
  },
  activeNavText: {
    color: '#007BFF',
  },
});
