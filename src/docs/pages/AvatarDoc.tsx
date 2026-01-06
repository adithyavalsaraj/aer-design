import { Avatar, AvatarGroup } from "@/components/Avatar";
import {
  ApiTable,
  CodeBlock,
  DocSection,
  DocTabs,
} from "@/docs/components/shared";
import { Check, Shield } from "lucide-react";

export function AvatarDoc() {
  const overview = (
    <div className="space-y-12">
      <DocSection
        id="introduction"
        title="Introduction"
        description="A premium avatar component for representing users, entities, or teams."
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-aer-muted-foreground">
            Avatars are essential for personalizing digital interfaces. The Aer
            Design Avatar component provides a weightless, premium aesthetic
            with built-in support for fallback states, status indicators, and
            overlapping groups.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-aer-muted-foreground">
            <li>
              <strong>Fallback Logic</strong>: Automatically switches to
              initials or a custom icon if an image fails to load.
            </li>
            <li>
              <strong>Status Indicators</strong>: Integrated dots for showing
              online, offline, busy, or away states.
            </li>
            <li>
              <strong>Aer Variant</strong>: Signature glassmorphism style that
              blends into any background.
            </li>
            <li>
              <strong>Avatar Groups</strong>: Smart grouping with overlapping
              avatars and "more" count indicators.
            </li>
            <li>
              <strong>Auto-Contrast</strong>: Dynamically adjusts text color for
              initials based on custom background colors.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="when-to-use"
        title="When to Use"
        description="Choosing the right avatar representation for your UI."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              User Profiles
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use for profile pictures in headers, comments sections, or user
              management lists.
            </p>
          </div>
          <div className="p-4 border border-aer-border rounded-lg bg-aer-muted/5">
            <h4 className="font-semibold mb-2 text-aer-foreground">
              Collaborative Lists
            </h4>
            <p className="text-sm text-aer-muted-foreground mb-3">
              Use AvatarGroups to show contributors on a project or active
              members in a chat room.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="basic"
        title="Basic Usage"
        description="Simplest implementation with an image."
      >
        <div className="flex gap-4 p-6 border rounded-lg bg-aer-muted/5 items-center justify-center">
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&h=128"
            alt="User"
          />
        </div>
        <CodeBlock
          ts={`<Avatar src="https://..." alt="User" />`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function BasicAvatar() {\n  return <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&h=128" alt="User" />;\n}`}
        />
      </DocSection>

      <DocSection
        id="variants"
        title="Visual Variants"
        description="Standard stylistic variations for different contexts."
      >
        <div className="flex flex-wrap gap-8 p-6 border rounded-lg bg-aer-muted/5 items-center justify-center">
          <Avatar initials="JD" variant="filled" />
          <Avatar initials="JD" variant="outline" />
          <Avatar initials="JD" variant="soft" />
          <Avatar initials="JD" variant="ghost" />
        </div>
        <CodeBlock
          ts={`<Avatar initials="JD" variant="filled" />\n<Avatar initials="JD" variant="outline" />\n<Avatar initials="JD" variant="soft" />\n<Avatar initials="JD" variant="ghost" />`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function AvatarVariants() {\n  return (\n    <div className="flex flex-wrap gap-8 p-6 bg-aer-muted/5 items-center justify-center">\n      <Avatar initials="JD" variant="filled" />\n      <Avatar initials="JD" variant="outline" />\n      <Avatar initials="JD" variant="soft" />\n      <Avatar initials="JD" variant="ghost" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="custom"
        title="Custom Usage"
        description="Using initials or custom fallback icons."
      >
        <div className="flex gap-8 p-6 border rounded-lg bg-aer-muted/5 items-center justify-center">
          <Avatar initials="AV" variant="soft" />
          <Avatar
            fallbackIcon={<Shield className="h-1/2 w-1/2" />}
            variant="outline"
          />
          <Avatar
            initials="JD"
            style={{ backgroundColor: "#f43f5e", color: "white" }}
          />
        </div>
        <CodeBlock
          ts={`<Avatar initials="AV" variant="soft" />\n<Avatar fallbackIcon={<Shield />} variant="outline" />\n<Avatar initials="JD" style={{ backgroundColor: '#f43f5e', color: 'white' }} />`}
          fullCode={`import { Avatar } from "aer-design";\nimport { Shield } from "lucide-react";\n\nexport default function CustomAvatars() {\n  return (\n    <div className="flex gap-8 p-6 bg-aer-muted/5 items-center justify-center">\n      <Avatar initials="AV" variant="soft" />\n      <Avatar fallbackIcon={<Shield className="h-1/2 w-1/2" />} variant="outline" />\n      <Avatar initials="JD" style={{ backgroundColor: '#f43f5e', color: 'white' }} />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="positioning"
        title="Positioning"
        description="Contextual guidance for avatar placement in IDE layouts."
      >
        <div className="prose prose-sm max-w-none text-aer-muted-foreground">
          <p>
            Avatars in Aer Design are sized using a standard{" "}
            <strong>4px grid</strong>. When placing avatars in:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Sidebars</strong>: Use <code>size="sm"</code> (32px) to
              save space while maintaining recognizability.
            </li>
            <li>
              <strong>Headers</strong>: Use <code>size="md"</code> (40px) as the
              primary focal point for user context.
            </li>
            <li>
              <strong>Overlays/Popovers</strong>: Use <code>size="lg"</code>{" "}
              (48px) to emphasize the entity in card-like surfaces.
            </li>
          </ul>
        </div>
      </DocSection>

      <DocSection
        id="status"
        title="Status Indicators"
        description="Communicate user availability at a glance."
      >
        <div className="flex gap-8 p-6 border rounded-lg bg-aer-muted/5 items-center justify-center">
          <Avatar
            status="online"
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=128&h=128"
          />
          <Avatar status="busy" initials="JD" variant="soft" />
          <Avatar status="away" initials="AV" variant="filled" />
          <Avatar
            status="offline"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128"
          />
        </div>
        <CodeBlock
          ts={`<Avatar status="online" src="..." />\n<Avatar status="busy" initials="JD" />\n<Avatar status="away" initials="AV" />\n<Avatar status="offline" src="..." />`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function AvatarStatuses() {\n  return (\n    <div className="flex gap-8 p-6 bg-aer-muted/5 items-center justify-center">\n      <Avatar status="online" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=128&h=128" />\n      <Avatar status="busy" initials="JD" variant="soft" />\n      <Avatar status="away" initials="AV" variant="filled" />\n      <Avatar status="offline" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="groups"
        title="Avatar Groups"
        description="Displaying multiple users with overlapping layout."
      >
        <div className="space-y-8 p-6 border rounded-lg bg-aer-muted/5 flex flex-col items-center">
          <AvatarGroup maxCount={4}>
            <Avatar src="https://i.pravatar.cc/128?u=1" />
            <Avatar src="https://i.pravatar.cc/128?u=2" />
            <Avatar src="https://i.pravatar.cc/128?u=3" />
            <Avatar src="https://i.pravatar.cc/128?u=4" />
            <Avatar src="https://i.pravatar.cc/128?u=5" />
            <Avatar src="https://i.pravatar.cc/128?u=6" />
          </AvatarGroup>

          <AvatarGroup size="sm" maxCount={3} variant="soft">
            <Avatar initials="JD" />
            <Avatar initials="AV" />
            <Avatar initials="SK" />
            <Avatar initials="LW" />
          </AvatarGroup>
        </div>
        <CodeBlock
          ts={`<AvatarGroup maxCount={4}>\n  <Avatar src="..." />\n  <Avatar src="..." />\n  {/* ... */}\n</AvatarGroup>`}
          fullCode={`import { Avatar, AvatarGroup } from "aer-design";\n\nexport default function AvatarGroups() {\n  return (\n    <div className="space-y-8 p-6 bg-aer-muted/5 flex flex-col items-center">\n      <AvatarGroup maxCount={4}>\n        <Avatar src="https://i.pravatar.cc/128?u=1" />\n        <Avatar src="https://i.pravatar.cc/128?u=2" />\n        <Avatar src="https://i.pravatar.cc/128?u=3" />\n        <Avatar src="https://i.pravatar.cc/128?u=4" />\n        <Avatar src="https://i.pravatar.cc/128?u=5" />\n      </AvatarGroup>\n\n      <AvatarGroup size="sm" maxCount={3} variant="soft">\n        <Avatar initials="JD" />\n        <Avatar initials="AV" />\n        <Avatar initials="SK" />\n        <Avatar initials="LW" />\n      </AvatarGroup>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="aer-variant"
        title="The Aer Variant"
        description="The flagship Aer aesthetic featuring glassmorphism and elevated depth."
      >
        <div className="aer-vibrant-container p-24">
          <div className="aer-vibrant-bg-wrapper">
            <div className="aer-vibrant-bg" />
            <div className="aer-vibrant-blob top-1/4 left-1/4 w-48 h-48 bg-sky-500/40" />
            <div className="aer-vibrant-blob bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/40" />
          </div>

          <div className="relative z-10 flex gap-8 items-center">
            <Avatar
              size="xl"
              variant="aer"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&h=128"
            />
            <Avatar size="xl" variant="aer" initials="JD" />
            <AvatarGroup size="xl" variant="aer">
              <Avatar src="https://i.pravatar.cc/128?u=10" />
              <Avatar src="https://i.pravatar.cc/128?u=11" />
              <Avatar src="https://i.pravatar.cc/128?u=12" />
            </AvatarGroup>
          </div>
        </div>
        <CodeBlock
          ts={`<Avatar variant="aer" />`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function AerAvatar() {\n  return (\n    <div className="bg-vibrant-gradient p-12">\n      <Avatar variant="aer" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&h=128" />\n    </div>\n  );\n}`}
        />
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Pro tip:</strong> The Aer variant for Avatars adds a
            distinct glassmorphism border and subtle inner shadow. It's
            especially effective in user lists or profile headers where you want
            to emphasize premium user tiers or highlight specific individuals
            against complex backgrounds.
          </p>
        </div>
      </DocSection>

      <DocSection
        id="states"
        title="Interaction States"
        description="Visual feedback for hover and focus states."
      >
        <div className="flex gap-8 p-6 border rounded-lg bg-aer-muted/5 items-center justify-center">
          <Avatar
            initials="H"
            className="hover:scale-110 hover:border-aer-primary transition-transform cursor-pointer"
          />
          <Avatar
            initials="F"
            className="focus-visible:ring-2 focus-visible:ring-aer-primary outline-hidden"
            tabIndex={0}
          />
        </div>
        <CodeBlock
          ts={`<Avatar className="hover:scale-110 transition-transform" />\n<Avatar className="focus-visible:ring-2 ring-aer-primary" />`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function InteractiveAvatars() {\n  return (\n    <div className="flex gap-8 p-6 bg-aer-muted/5 items-center justify-center">\n      <Avatar \n        initials="H" \n        className="hover:scale-110 hover:border-aer-primary transition-transform cursor-pointer" \n      />\n      <Avatar \n        initials="F" \n        className="focus-visible:ring-2 focus-visible:ring-aer-primary outline-hidden" \n        tabIndex={0} \n      />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="validation"
        title="Validation & Errors"
        description="How the avatar handles missing or broken assets."
      >
        <div className="flex gap-8 p-6 border rounded-lg bg-aer-muted/5 items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-aer-muted-foreground mb-2">Broken URL</p>
            <Avatar src="https://broken-link.com/img.png" initials="ERR" />
          </div>
          <div className="text-center">
            <p className="text-xs text-aer-muted-foreground mb-2">
              Internal Scroll Block
            </p>
            <Avatar initials="SC" className="overflow-hidden" />
          </div>
        </div>
        <CodeBlock
          ts={`<Avatar \n  src="invalid-path" \n  initials="ERR" \n/>`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function ErrorHandling() {\n  return (\n    <div className="flex gap-8 p-6 bg-aer-muted/5 items-center justify-center">\n      <Avatar src="https://broken-link.com/img.png" initials="ERR" />\n      <Avatar initials="SC" className="overflow-hidden" />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="styling"
        title="Granular Styling"
        description="Style targets for deep customization."
      >
        <div className="flex gap-8 p-6 border rounded-lg bg-aer-muted/5 items-center justify-center">
          <Avatar
            initials="S"
            className="bg-linear-to-tr from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
          />
          <Avatar
            src="https://i.pravatar.cc/128?u=9"
            className="ring-4 ring-emerald-500/30 ring-offset-2"
          />
        </div>
        <div className="prose prose-sm max-w-none mt-4 text-aer-muted-foreground">
          <p>Styleable slots:</p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Root</strong>: The outer container (customizable via{" "}
              <code>className</code>).
            </li>
            <li>
              <strong>Image</strong>: Targeted via <code>img</code> tag in CSS.
            </li>
            <li>
              <strong>Fallback</strong>: The text or icon container.
            </li>
            <li>
              <strong>Status</strong>: The absolute-positioned status dot.
            </li>
          </ul>
        </div>
        <CodeBlock
          ts={`<Avatar \n  initials="S" \n  className="bg-linear-to-tr from-purple-500 to-pink-500 text-white border-transparent" \n/>`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function GranularStyling() {\n  return (\n    <div className="flex gap-8 p-6 bg-aer-muted/5 items-center justify-center">\n      <Avatar \n        initials="S" \n        className="bg-linear-to-tr from-purple-500 to-pink-500 text-white border-transparent shadow-lg" \n      />\n      <Avatar \n        src="https://i.pravatar.cc/128?u=9" \n        className="ring-4 ring-emerald-500/30 ring-offset-2" \n      />\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="real-world"
        title="Real World Example"
        description="A project collaborator list in a dashboard environment."
      >
        <div className="p-8 border border-aer-border rounded-xl bg-aer-background shadow-sm w-full max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Project Collaborators</h3>
            <span className="text-xs text-aer-primary font-bold bg-aer-primary/10 px-2 py-1 rounded">
              ACTIVE
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Billi M",
                role: "Lead Designer",
                status: "online",
                img: "https://i.pravatar.cc/128?u=billi",
              },
              {
                name: "Sarah Chen",
                role: "Frontend Engineer",
                status: "busy",
                initials: "SC",
              },
              {
                name: "Marcus Wright",
                role: "Product Manager",
                status: "away",
                img: "https://i.pravatar.cc/128?u=marcus",
              },
            ].map((user) => (
              <div
                key={user.name}
                className="flex items-center gap-3 p-2 hover:bg-aer-muted/20 rounded-lg transition-colors cursor-pointer group"
              >
                <Avatar
                  src={user.img}
                  initials={user.initials}
                  status={user.status as any}
                  variant={user.initials ? "soft" : "filled"}
                  className="group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-xs text-aer-muted-foreground">
                    {user.role}
                  </span>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Check className="h-4 w-4 text-aer-primary" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-aer-border flex items-center justify-between">
            <AvatarGroup maxCount={5} size="sm">
              <Avatar src="https://i.pravatar.cc/128?u=1" />
              <Avatar src="https://i.pravatar.cc/128?u=2" />
              <Avatar src="https://i.pravatar.cc/128?u=3" />
              <Avatar src="https://i.pravatar.cc/128?u=4" />
              <Avatar src="https://i.pravatar.cc/128?u=5" />
              <Avatar src="https://i.pravatar.cc/128?u=6" />
            </AvatarGroup>
            <button className="text-xs font-bold text-aer-muted-foreground hover:text-aer-foreground transition-colors">
              Manage Access
            </button>
          </div>
        </div>
        <CodeBlock
          ts={`// Implementation of a collaborator list`}
          fullCode={`import { Avatar, AvatarGroup } from "aer-design";\nimport { Check } from "lucide-react";\n\nconst collaborators = [\n  { name: "Adithya Valsaraj", role: "Lead Designer", status: "online", img: "https://i.pravatar.cc/128?u=adith" },\n  { name: "Sarah Chen", role: "Frontend Engineer", status: "busy", initials: "SC" },\n  { name: "Marcus Wright", role: "Product Manager", status: "away", img: "https://i.pravatar.cc/128?u=marcus" }\n];\n\nexport default function CollaboratorList() {\n  return (\n    <div className="p-8 border border-aer-border rounded-xl bg-aer-background shadow-sm w-full max-w-md mx-auto">\n      <div className="flex items-center justify-between mb-6">\n        <h3 className="font-bold text-lg text-left">Project Collaborators</h3>\n        <span className="text-xs text-aer-primary font-bold bg-aer-primary/10 px-2 py-1 rounded">ACTIVE</span>\n      </div>\n      <div className="space-y-4">\n         {collaborators.map((user) => (\n           <div key={user.name} className="flex items-center gap-3 p-2 hover:bg-aer-muted/20 rounded-lg transition-colors cursor-pointer group">\n             <Avatar src={user.img} initials={user.initials} status={user.status as any} variant={user.initials ? "soft" : "filled"} />\n             <div className="flex flex-col text-left">\n               <span className="text-sm font-semibold">{user.name}</span>\n               <span className="text-xs text-aer-muted-foreground">{user.role}</span>\n             </div>\n             <Check className="ml-auto h-4 w-4 text-aer-primary opacity-0 group-hover:opacity-100 transition-opacity" />\n           </div>\n         ))}\n      </div>\n      <div className="mt-8 pt-6 border-t border-aer-border flex items-center justify-between">\n        <AvatarGroup maxCount={5} size="sm">\n           <Avatar src="https://i.pravatar.cc/128?u=1" />\n           <Avatar src="https://i.pravatar.cc/128?u=2" />\n           <Avatar src="https://i.pravatar.cc/128?u=3" />\n        </AvatarGroup>\n        <button className="text-xs font-bold text-aer-muted-foreground hover:text-aer-foreground">Manage Access</button>\n      </div>\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  const api = (
    <div className="space-y-12">
      <DocSection
        id="avatar-props"
        title="Avatar Props"
        description="Configuration options for the base Avatar component."
      >
        <ApiTable
          data={[
            {
              prop: "src",
              type: "string",
              default: "-",
              description: "Image source URL.",
            },
            {
              prop: "alt",
              type: "string",
              default: "-",
              description: "Alt text for the image.",
            },
            {
              prop: "initials",
              type: "string",
              default: "-",
              description: "Fallback text to show if no image exists.",
            },
            {
              prop: "size",
              type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
              default: "'md'",
              description: "Size of the avatar.",
            },
            {
              prop: "variant",
              type: "'filled' | 'outline' | 'soft' | 'ghost' | 'aer'",
              default: "'filled'",
              description: "Visual variant.",
            },
            {
              prop: "status",
              type: "'online' | 'offline' | 'busy' | 'away'",
              default: "-",
              description: "Current user status dot.",
            },
            {
              prop: "rounded",
              type: "'sm' | 'md' | 'lg' | 'full'",
              default: "'full'",
              description: "Border radius style.",
            },
            {
              prop: "fallbackIcon",
              type: "ReactNode",
              default: "<User />",
              description: "Icon to show as last resort fallback.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="avatar-group-props"
        title="AvatarGroup Props"
        description="Configuration for grouped avatars."
      >
        <ApiTable
          data={[
            {
              prop: "maxCount",
              type: "number",
              default: "-",
              description: "Max number of avatars before showing count.",
            },
            {
              prop: "spacing",
              type: "number",
              default: "-12",
              description: "Overlap spacing in pixels (negative for overlap).",
            },
            {
              prop: "size",
              type: "AvatarSize",
              default: "-",
              description: "Overrides children sizes.",
            },
            {
              prop: "variant",
              type: "AvatarVariant",
              default: "-",
              description: "Overrides children variants.",
            },
          ]}
        />
      </DocSection>
    </div>
  );

  const theming = (
    <div className="space-y-12">
      <DocSection
        id="css-variables"
        title="CSS Variables"
        description="Customize the avatar using standard CSS variables."
      >
        <CodeBlock
          ts={`:root {\n  --aer-avatar-size-md: 40px;\n  --aer-avatar-radius: 9999px;\n}`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function CustomCSS() {\n  return (\n    <div className="flex flex-col gap-6 p-6 items-center">\n      <style>\n        {\` .custom-avatar { --aer-avatar-size-md: 80px; --aer-avatar-radius: 12px; } \`}\n      </style>\n      <Avatar initials="CA" size="md" className="custom-avatar" />\n      <p className="text-xs text-aer-muted-foreground text-center">Using CSS Variables to override internal slots</p>\n    </div>\n  );\n}`}
        />
      </DocSection>

      <DocSection
        id="auto-contrast"
        title="Auto-Contrast"
        description="Integrated accessibility for custom backgrounds."
      >
        <div className="p-6 border rounded-lg bg-aer-muted/5 flex items-center justify-center gap-8">
          <Avatar initials="WC" style={{ backgroundColor: "#ffffff" }} />
          <Avatar initials="WC" style={{ backgroundColor: "#000000" }} />
        </div>
        <div className="prose prose-sm max-w-none mt-4 text-aer-muted-foreground">
          <p>
            When a <code>backgroundColor</code> is provided via the{" "}
            <code>style</code> prop, the component automatically calculates the
            optimal text contrast using our
            <code>useContrastColor</code> hook.
          </p>
        </div>
        <CodeBlock
          ts={`<Avatar initials="WC" style={{ backgroundColor: '#ffffff' }} />\n<Avatar initials="WC" style={{ backgroundColor: '#000000' }} />`}
          fullCode={`import { Avatar } from "aer-design";\n\nexport default function AutoContrast() {\n  return (\n    <div className="flex gap-8 p-6 bg-aer-muted/5 items-center justify-center">\n      <Avatar initials="WC" style={{ backgroundColor: "#ffffff" }} />\n      <Avatar initials="WC" style={{ backgroundColor: "#000000" }} />\n    </div>\n  );\n}`}
        />
      </DocSection>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="mb-10 text-left">
        <h1 className="text-4xl font-bold mb-4">Avatar</h1>
        <p className="text-xl text-aer-muted-foreground">
          Visual representation for users and entities with premium
          glassmorphism.
        </p>
      </div>

      <DocTabs
        tabs={[
          {
            id: "overview",
            label: "Overview",
            content: overview,
            toc: [
              { id: "introduction", title: "Introduction" },
              { id: "when-to-use", title: "When to Use" },
              { id: "basic", title: "Basic Usage" },
              { id: "variants", title: "Visual Variants" },
              { id: "custom", title: "Custom Usage" },
              { id: "positioning", title: "Positioning" },
              { id: "status", title: "Status Indicators" },
              { id: "groups", title: "Avatar Groups" },
              { id: "aer-variant", title: "The Aer Variant" },
              { id: "states", title: "Interaction States" },
              { id: "validation", title: "Validation & Errors" },
              { id: "styling", title: "Granular Styling" },
              { id: "real-world", title: "Real World Example" },
            ],
          },
          { id: "api", label: "API", content: api },
          { id: "theming", label: "Theming", content: theming },
        ]}
      />
    </div>
  );
}
