import { useSelector } from 'react-redux'

export const useMenuItemsAgent = () => {
  const { website } = useSelector((state) => state?.website || [])
  const FormMatted = (state) => (state ? state.replace(/ /g, '-').toLowerCase() : '')

  const temp =
    website ?? Array.isArray(website)
      ? website.map((item) => ({
          key: item?.id,
          icon: 'iconoir:view-grid',
          label: item?.title,
          children: [
            {
              key: `${item?.id}-view`,
              label: 'View Website',
              parentKey: item?.id,
              url: `/agentdashboard/${FormMatted(item.title)}/${item?.id}`,
            },
            {
              key: `${item?.id}-contact`,
              label: 'Contact Information',
              parentKey: item?.id,
              url: `/agentdashboard/${FormMatted(item.title)}/contactinformation/${item?.id}`,
            },
            // {
            //   key: `${item?.id}-logo`,
            //   label: 'Logo',
            //   parentKey: item?.id,
            //   url: `/agentdashboard/${FormMatted(item.title)}/logo/${item?.id}`,
            // },
            {
              key: `${item?.id}-contact-us`,
              label: 'Contact Us',
              parentKey: item?.id,
              url: `/agentdashboard/${FormMatted(item.title)}/message/${item?.id}`,
            },
            // {
            //   key: `${item?.id}-supplier`,
            //   label: 'Supplier',
            //   parentKey: item?.id,
            //   url: `/agentdashboard/${FormMatted(item.title)}/supplier/${item?.id}`,
            // },
            {
              key: `${item?.id}-about`,
              label: 'About Us',
              parentKey: item?.id,
              url: `/agentdashboard/${FormMatted(item.title)}/about_us/${item?.id}`,
            },
            // {
            //   key: `${item?.id}-blogs`,
            //   label: 'Blogs',
            //   parentKey: item?.id,
            //   url: `/agentdashboard/${FormMatted(item.title)}/blog/${item?.id}`,
            // },
            // {
            //   key: `${item?.id}-formbuilder`,
            //   label: 'FormBuilder',
            //   parentKey: item?.id,
            //   url: `/agentdashboard/${FormMatted(item.title)}/form_builder/${item?.id}`,
            // },
          ],
        }))
      : []

  const MENU_ITEMSAGENTs = [
    {
      key: 'main',
      label: 'Agent',
      isTitle: true,
    },
    {
      key: 'dashboards',
      icon: 'iconoir:view-grid',
      label: 'Dashboards',
      url: '/agentdashboard',
    },
    {
      key: 'client',
      icon: 'iconoir:home',
      label: 'My Clients',
      url: '/agentdashboard/client',
    },
    {
      key: 'itineraries',
      icon: 'iconoir:mail',
      label: 'Quotes',
      url: '/agentdashboard/travel',
    },
    {
      key: 'payment',
      icon: 'iconoir:dashboard',
      label: 'Payment Notification',
      url: '/agentdashboard/payment',
    },
    {
      key: 'comission',
      icon: 'iconoir:home',
      label: 'Commission',
      url: '/agentdashboard/commission',
    },
    {
      key: 'agents',
      icon: 'iconoir:user',
      label: 'My Itineraries',
      url: '/agentdashboard/itineraries',
    },

    {
      key: 'tutorial',
      icon: 'mdi:bar-chart',
      label: 'Tutorial',
      url: '/agentdashboard/tutorials-2',
    },
    {
      key: 'chat',
      icon: 'mdi:chat',
      label: 'Support',
      url: '/agentdashboard/chat-support',
    },

    {
      key: 'w9',
      icon: 'mdi:cash-register',
      label: 'Taxes',
      children: [
        {
          key: `w9`,
          label: 'W9',
          parentKey: 'w9',
          url: '/agentdashboard/wnine',
        },
        {
          key: 'w8',
          parentKey: 'w9',
          label: 'W8',
          url: '/agentdashboard/wEight',
        },
        {
          key: 'pdf_irsshow',
          label: '1099',
          parentKey: 'w9',
          url: '/agentdashboard/pdf_irsshow',
        },
      ],
    },
    {
      key: 'components',
      label: 'Websites',
      isTitle: true,
    },
  ]
  return [...MENU_ITEMSAGENTs, ...temp]
}

export const MENU_ITEMS = [
  {
    key: 'main',
    label: 'Admin',
    isTitle: true,
  },
  {
    key: 'dashboards',
    icon: 'iconoir:view-grid',
    label: 'Dashboards',
    url: '/dashboard',
  },
  {
    key: 'websitenew',
    icon: 'iconoir:globe',
    label: 'Travel+ Website',
    children: [
      {
        key: 'hero-section',
        icon: 'iconoir:camera',
        parentKey: 'websitenew',
        label: 'Hero Section',
        url: '/dashboard/Travel-Website/hero-section',
      },
      {
        key: 'image-section',
        icon: 'iconoir:camera',
        parentKey: 'websitenew',
        label: 'Image Section',
        url: '/dashboard/Travel-Website/image-section',
      },
      {
        key: 'about-section',
        icon: 'iconoir:info-circle',
        parentKey: 'websitenew',
        label: 'About Section',
        url: '/dashboard/Travel-Website/about-section',
      },
      {
        key: 'explore-section',
        icon: 'iconoir:compass',
        parentKey: 'websitenew',
        label: 'Explore Section',
        url: '/dashboard/Travel-Website/explore-section',
      },
      {
        key: 'tabs-sections',
        icon: 'mdi:tab',
        label: 'Tab Section',
        parentKey: 'websitenew',
        url: '/dashboard/Travel-Website/tabs-section',
      },
      {
        key: 'content-sections',
        icon: 'mdi:file-document-outline',
        label: 'Content Section',
        parentKey: 'websitenew',
        url: '/dashboard/Travel-Website/content-section',
      },
      {
        key: 'testimonial-section',
        icon: 'mdi:comment-quote-outline',
        label: 'Testimonial Section',
        parentKey: 'websitenew',
        url: '/dashboard/Travel-Website/testimonial-section',
      },
      {
        key: 'home',
        icon: 'iconoir:home-simple-door',
        parentKey: 'websitenew',
        label: 'Home',
        children: [
          {
            key: 'welcome-sec',
            label: 'Welcome Section',
            parentKey: 'home',
            url: '/dashboard/Travel-Website/home/welcome-section',
          },
        ],
      },
      {
        key: 'services',
        icon: 'iconoir:suitcase',
        parentKey: 'websitenew',
        label: 'Services',
        children: [
          {
            key: 'travel-services',
            label: 'Travel Services',
            parentKey: 'services',
            url: '/dashboard/Travel-Website/services/travel-services',
            children: [
              {
                key: 'travel-expert',
                label: 'Expert Section',
                parentKey: 'travel-services',
                url: '/dashboard/Travel-Website/services/travel-services/expert',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'agents',
    icon: 'iconoir:user',
    label: 'Agent',
    url: '/dashboard/agents',
  },

  {
    key: 'website',
    icon: 'iconoir:globe',
    label: 'Website',
    url: '/dashboard/website',
  },
  {
    key: 'supplier',
    icon: 'iconoir:package',
    label: 'Supplier',
    url: '/dashboard/supplier',
  },
  {
    key: 'comission',
    icon: 'iconoir:money',
    label: 'Commission',
    url: '/dashboard/commission',
  },
  {
    key: 'W9',
    icon: 'iconoir:document',
    label: 'W9',
    url: '/dashboard/wnine',
  },
  {
    key: 'W8',
    icon: 'iconoir:document',
    label: 'W8',
    url: '/dashboard/wEight',
  },

  {
    key: 'pdf_irsshow',
    icon: 'iconoir:file',
    label: '1099',
    url: '/dashboard/pdf_irsshow',
  },
  {
    key: 'reports',
    icon: 'md:bar-chart',
    label: 'Reports',
    url: '/dashboard/reports',
  },
  {
    key: 'tutorials',
    icon: 'mdi:bar-chart',
    label: 'Tutorials',
    url: '/dashboard/tutorials',
  },
  {
    key: 'promotion',
    icon: 'mdi:bar-chart',
    label: 'Promotion',
    url: '/dashboard/promotion',
  },
  {
    key: 'chat',
    icon: 'mdi:chat',
    label: 'Support',
    url: '/dashboard/chat-support',
  },
]
export const MENU_ITEMSNEWAGENT = [
  {
    key: 'main',
    label: 'Agent',
    isTitle: true,
  },
  {
    key: 'w9',
    icon: 'mdi:cash-register',
    label: 'Taxes',
    children: [
      {
        key: `w9`,
        label: 'W9',
        parentKey: 'w9',
        url: '/agentdashboard/wnine',
      },
      {
        key: 'w8',
        parentKey: 'w9',
        label: 'W8',
        url: '/agentdashboard/wEight',
      },
      {
        key: 'pdf_irsshow',
        label: '1099',
        parentKey: 'w9',
        url: '/agentdashboard/pdf_irsshow',
      },
    ],
  },
]
