import React from 'react';
import Layout from '@/components/Layout';
// Removed useUserRole import
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const AdminDashboard: React.FC = () => {
  // Removed role and loading from useUserRole
  const { t } = useLanguage(); // Use translation hook

  // Since client-side role checking is removed, this page will always render its content.
  // Backend RLS will still protect data operations.
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('admin_dashboard_title')}</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t('admin_dashboard_welcome')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('manage_curriculum')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{t('manage_curriculum_description')}</p>
              <Link to="/admin/curriculum/phases" className="text-blue-500 hover:underline mt-4 block">{t('go_to_curriculum_management')}</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('manage_quizzes')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{t('manage_quizzes_description')}</p>
              <Link to="/admin/curriculum/quizzes" className="text-blue-500 hover:underline mt-4 block">{t('go_to_quiz_management')}</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('manage_users')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{t('manage_users_description')}</p>
              <Link to="/admin/users" className="text-blue-500 hover:underline mt-4 block">{t('go_to_user_management')}</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('view_reports')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{t('view_reports_description')}</p>
              <Link to="#" className="text-blue-500 hover:underline mt-4 block">{t('go_to_reports')}</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;