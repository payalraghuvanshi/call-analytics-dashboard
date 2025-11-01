# 🤝 Contributing to Call Analytics Dashboard

Thank you for considering contributing to this project! This document will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)

## 🌟 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Keep discussions professional

## 💡 How Can I Contribute?

### Reporting Bugs

Open an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

### Suggesting Features

Open an issue with:
- Clear description of the feature
- Why it would be useful
- Possible implementation approach
- Mockups/examples if applicable

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## 🛠️ Development Setup

```bash
# Clone your fork
git clone https://github.com/payalraghuvanshi/call-analytics-dashboard.git
cd call-analytics

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm start
```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type
- Use functional components

### React

- Use functional components with hooks
- Keep components focused and small
- Use proper prop types
- Handle errors gracefully

### Styling

- Use existing CSS classes when possible
- Follow the established color scheme
- Maintain responsive design
- Test on multiple screen sizes

### Code Style

```typescript
// ✅ Good
interface ChartData {
  name: string;
  value: number;
}

const MyComponent: React.FC<Props> = ({ data }) => {
  const [state, setState] = useState<ChartData[]>([]);
  
  return <div>{/* content */}</div>;
};

// ❌ Avoid
function MyComponent(props: any) {
  var state = [];
  // ...
}
```

### Naming Conventions

- Components: PascalCase (`UserProfile.tsx`)
- Files: camelCase (`supabaseClient.ts`)
- CSS classes: kebab-case (`.chart-card`)
- Functions: camelCase (`handleDataChange`)
- Constants: UPPER_SNAKE_CASE (`API_URL`)

## 🧪 Testing

Before submitting:

```bash
# Run linter
npm run lint

# Run tests
npm test

# Build production
npm run build
```

### Manual Testing Checklist

- [ ] Load app successfully
- [ ] All charts render correctly
- [ ] Email modal works
- [ ] Data can be edited
- [ ] Data saves to Supabase
- [ ] Overwrite warning appears
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Works in major browsers

## 📤 Submitting Changes

### Commit Messages

Follow conventional commits:

```
feat: Add new chart type
fix: Resolve email validation bug
docs: Update README with new examples
style: Improve button styling
refactor: Simplify data handling
test: Add tests for chart component
```

### Pull Request Process

1. **Update documentation** if needed
2. **Test thoroughly** on multiple browsers
3. **Write clear PR description**:
   ```markdown
   ## What does this PR do?
   Brief description
   
   ## Changes made
   - Change 1
   - Change 2
   
   ## Testing
   How it was tested
   
   ## Screenshots
   If applicable
   ```

4. **Link related issues**: `Closes #123`
5. **Wait for review**
6. **Address feedback** if requested

## 🎯 Priority Areas

We especially welcome contributions in:

- **New chart types**: Add more visualization options
- **Themes**: Light mode, custom themes
- **Authentication**: Enhanced security features
- **Performance**: Optimization improvements
- **Documentation**: Better guides and examples
- **Testing**: Unit and integration tests
- **Accessibility**: ARIA labels, keyboard navigation
- **Internationalization**: Multi-language support

## 🏗️ Adding New Features

### Example: Adding a New Chart

1. **Define data structure** in `types.ts`
```typescript
export interface NewChartData {
  label: string;
  value: number;
}
```

2. **Create dummy data** in `App.tsx`
```typescript
const newChartData: NewChartData[] = [
  { label: 'Item 1', value: 100 },
  { label: 'Item 2', value: 200 },
];
```

3. **Add chart component**
```typescript
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={newChartData}>
    {/* chart config */}
  </BarChart>
</ResponsiveContainer>
```

4. **Style it** in `App.css`
```css
.new-chart-card {
  /* custom styles */
}
```

5. **Test and document**

## 🐛 Debugging Tips

### React DevTools

- Install React DevTools browser extension
- Inspect component state and props
- Track re-renders

### Supabase Issues

- Check browser Network tab
- Verify credentials in .env
- Test queries in Supabase SQL Editor
- Check RLS policies

### CSS Issues

- Use browser DevTools (F12)
- Check responsive design view
- Test dark/light mode
- Verify cross-browser compatibility

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Recharts Documentation](https://recharts.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Bootstrap Docs](https://react-bootstrap.github.io/)

## ❓ Questions?

- Open an issue for discussion
- Check existing issues and PRs
- Read the documentation
- Ask in discussions

## 🎉 Thank You!

Every contribution, no matter how small, is valued and appreciated!

---

**Happy coding!** 🚀

