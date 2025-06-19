import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Company Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
        {
          name: 'description',
          title: 'Company Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'Twitter', value: 'twitter'},
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'LinkedIn', value: 'linkedin'},
                      {title: 'YouTube', value: 'youtube'},
                      {title: 'WhatsApp', value: 'whatsapp'},
                      {title: 'TikTok', value: 'tiktok'},
                    ],
                  },
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'platform',
                  subtitle: 'url',
                },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Link Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'isExternal',
                      title: 'External Link?',
                      type: 'boolean',
                      initialValue: false,
                      description: 'Check if this link opens in a new tab',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'url',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'links.0.label',
            },
            prepare(selection: any) {
              const {title, subtitle} = selection
              return {
                title,
                subtitle: subtitle ? `First link: ${subtitle}` : 'No links',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'email',
        },
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description:
        'Leave empty to use default format: © {currentYear} {companyName}. All rights reserved.',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Used in copyright text and other places',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'companyInfo.logo',
    },
  },
})
