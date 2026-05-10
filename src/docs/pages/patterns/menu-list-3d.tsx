import {
  Bell,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import { MenuList3D } from '../../../patterns/MenuList3D/MenuList3D';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function MenuList3DDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>Profile header, storage progress, two grouped sections, and a destructive sign-out.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-8">
            <MenuList3D
              avatarSrc="https://i.pravatar.cc/96?img=14"
              name="Lara Chen"
              email="lara@studio.dev"
              trailing="v1.4"
            >
              <MenuList3D.Progress
                value={62}
                label="Storage"
                hint="12 / 50 GB"
              />
              <MenuList3D.Divider />
              <MenuList3D.Group label="Account">
                <MenuList3D.Item icon={<User className="size-4" />}>
                  Profile
                </MenuList3D.Item>
                <MenuList3D.Item icon={<CreditCard className="size-4" />} trailing="Pro">
                  Billing
                </MenuList3D.Item>
                <MenuList3D.Item icon={<Bell className="size-4" />} trailing="3">
                  Notifications
                </MenuList3D.Item>
              </MenuList3D.Group>
              <MenuList3D.Divider />
              <MenuList3D.Group label="Preferences">
                <MenuList3D.Item icon={<Settings className="size-4" />}>
                  Settings
                </MenuList3D.Item>
                <MenuList3D.Item icon={<Globe className="size-4" />} trailing="EN">
                  Language
                </MenuList3D.Item>
                <MenuList3D.Item icon={<Shield className="size-4" />}>
                  Privacy
                </MenuList3D.Item>
                <MenuList3D.Item icon={<HelpCircle className="size-4" />}>
                  Help
                </MenuList3D.Item>
              </MenuList3D.Group>
              <MenuList3D.Divider />
              <MenuList3D.Item icon={<LogOut className="size-4" />} destructive>
                Sign out
              </MenuList3D.Item>
            </MenuList3D>
          </div>
        }
        minHeight="36rem"
        code={`<MenuList3D
  avatarSrc="/avatar.jpg"
  name="Lara Chen"
  email="lara@studio.dev"
  trailing="v1.4"
>
  <MenuList3D.Progress value={62} label="Storage" hint="12 / 50 GB" />
  <MenuList3D.Divider />
  <MenuList3D.Group label="Account">
    <MenuList3D.Item icon={<User />}>Profile</MenuList3D.Item>
    <MenuList3D.Item icon={<CreditCard />} trailing="Pro">Billing</MenuList3D.Item>
  </MenuList3D.Group>
  <MenuList3D.Divider />
  <MenuList3D.Item icon={<LogOut />} destructive>Sign out</MenuList3D.Item>
</MenuList3D>`}
      />

      <H2>Without header</H2>
      <P>Drop the header props for a pure menu — useful inside popovers.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-8">
            <MenuList3D>
              <MenuList3D.Item icon={<User className="size-4" />}>
                View profile
              </MenuList3D.Item>
              <MenuList3D.Item icon={<Settings className="size-4" />}>
                Account settings
              </MenuList3D.Item>
              <MenuList3D.Divider />
              <MenuList3D.Item icon={<LogOut className="size-4" />} destructive>
                Sign out
              </MenuList3D.Item>
            </MenuList3D>
          </div>
        }
        minHeight="18rem"
        code={`<MenuList3D>
  <MenuList3D.Item icon={<User />}>View profile</MenuList3D.Item>
  <MenuList3D.Item icon={<Settings />}>Account settings</MenuList3D.Item>
  <MenuList3D.Divider />
  <MenuList3D.Item icon={<LogOut />} destructive>Sign out</MenuList3D.Item>
</MenuList3D>`}
      />

      <H2>API — root</H2>
      <PropsTable
        rows={[
          { name: 'avatarSrc', type: 'string', description: 'Avatar image URL for the header.' },
          { name: 'avatarFallback', type: 'string', description: 'Fallback initial used when no image is provided.' },
          { name: 'name', type: 'string', description: 'Display name.' },
          { name: 'email', type: 'string', description: 'Email or sub-label under the name.' },
          { name: 'trailing', type: 'ReactNode', description: 'Right-aligned header content (eg. version badge).' },
        ]}
      />

      <H2>API — Item</H2>
      <PropsTable
        rows={[
          { name: 'icon', type: 'ReactNode', description: 'Icon shown inside the inset well on the left.' },
          { name: 'trailing', type: 'ReactNode', description: 'Right-side content. Defaults to a chevron when absent.' },
          { name: 'hideChevron', type: 'boolean', description: 'Suppress the default chevron when no trailing is set.' },
          { name: 'destructive', type: 'boolean', description: 'Red text + red icon well — for sign-out and delete.' },
        ]}
      />

      <H2>API — Progress</H2>
      <PropsTable
        rows={[
          { name: 'value', type: 'number (0–100)', description: 'Current fill percentage.' },
          { name: 'label', type: 'ReactNode', description: 'Label above the bar.' },
          { name: 'hint', type: 'ReactNode', description: 'Right-aligned hint, eg. "12 / 50 GB".' },
        ]}
      />
    </article>
  );
}
