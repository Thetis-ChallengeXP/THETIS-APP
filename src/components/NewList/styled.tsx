import styled from 'styled-components/native';

const NewsItem = styled.View`
  flex-direction: row;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const NewsContent = styled.View`
  flex: 1;
  margin-right: 12px;
`;

const NewsTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  line-height: 22px;
`;

const CompanyInfo = styled.View`
  margin-top: 4px;
`;

const Company = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
`;

const CompanyDetails = styled.Text`
  font-size: 12px;
  color: #888;
`;

const ArrowContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 32px;
`;

export const StyledNewsList = {
  NewsItem,
  NewsContent,
  NewsTitle,
  CompanyInfo,
  Company,
  CompanyDetails,
  ArrowContainer,
};