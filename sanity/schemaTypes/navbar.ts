import {defineType, defineField} from 'sanity'
import type {
  ValidationContext,
  PrepareViewOptions,
  ConditionalPropertyCallbackContext,
} from 'sanity'

// Define interfaces for better type safety
interface NavigationItemParent {
  hasSubItems?: boolean
  [key: string]: unknown
}

interface CustomValidationContext extends ValidationContext {
  parent?: NavigationItemParent
}

interface PreviewSelection {
  title?: string
  subtitle?: string
  hasSubItems?: boolean
}

export default defineType({
  name: 'navbar',
  title: 'Navigation Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
    }),
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'hasSubItems',
              title: 'Has Sub-menu Items?',
              type: 'boolean',
              initialValue: false,
              description: 'Toggle this to enable sub-menu items for this navigation item',
            },
            {
              name: 'route',
              title: 'Route',
              type: 'string',
              hidden: (context: ConditionalPropertyCallbackContext) => {
                const parent = context.parent as NavigationItemParent
                return Boolean(parent?.hasSubItems)
              },
              validation: (Rule) =>
                Rule.custom((route: string | undefined, context) => {
                  const typedContext = context as CustomValidationContext
                  const hasSubItems = Boolean(typedContext.parent?.hasSubItems)
                  if (!hasSubItems && !route) {
                    return 'Route is required when not using sub-items'
                  }
                  return true
                }),
              description:
                'The route for this navigation item (hidden when has sub-items is enabled)',
            },
            {
              name: 'subItems',
              title: 'Sub Menu Items',
              type: 'array',
              hidden: (context: ConditionalPropertyCallbackContext) => {
                const parent = context.parent as NavigationItemParent
                return !parent?.hasSubItems
              },
              validation: (Rule) =>
                Rule.custom((subItems: unknown[] | undefined, context) => {
                  const typedContext = context as CustomValidationContext
                  const hasSubItems = Boolean(typedContext.parent?.hasSubItems)
                  if (hasSubItems && (!subItems || subItems.length === 0)) {
                    return 'At least one sub-item is required when "Has Sub-menu Items" is enabled'
                  }
                  return true
                }),
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Sub Item Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'route',
                      title: 'Sub Item Route',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'route',
                    },
                  },
                },
              ],
              description: 'Sub-menu items (shown when has sub-items is enabled)',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'route',
              hasSubItems: 'hasSubItems',
            },
            prepare(selection: Record<string, any>, viewOptions?: PrepareViewOptions) {
              const typedSelection = selection as PreviewSelection
              const {title, subtitle, hasSubItems} = typedSelection
              return {
                title: title ?? 'Untitled',
                subtitle: hasSubItems ? 'Has sub-items' : (subtitle ?? 'No route'),
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
        },
        {
          name: 'action',
          title: 'Button Action',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})
