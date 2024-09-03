import styles from './Statistics.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DonutChart from '../DonutChart';
import { IFile } from '../../interfaces/IFiles';

const classifyFileType = (mimetype: string): string => {
  if (mimetype.startsWith('audio/')) return 'Audio';
  if (mimetype.startsWith('video/')) return 'Video';
  if (mimetype.startsWith('image/')) return 'Image';
  if (
    mimetype === 'text/plain' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimetype === 'application/pdf'
  )
    return 'Document';
  return 'Other';
};

const Statistics = () => {
  const files = useSelector((state: RootState) => state.filesSlice.files);

  const fileTypeCounts: Record<string, number> = {
    Audio: 0,
    Image: 0,
    Video: 0,
    Document: 0,
    Other: 0,
  };

  files.forEach((file: IFile) => {
    const fileType = classifyFileType(file.mimetype);
    fileTypeCounts[fileType]++;
  });

  const data = [
    fileTypeCounts['Audio'],
    fileTypeCounts['Image'],
    fileTypeCounts['Video'],
    fileTypeCounts['Document'],
    fileTypeCounts['Other'],
  ];

  return (
    <div className={styles.statistics_wrap}>
      <div className={styles.statistics_header}>Statistics</div>

      <div className={styles.statistics_block}>
        {files.length === 0 ? (
          <div className={styles.empty_files_diagram}>
            <span>Добавьте файл(-ы)</span>
            <span>для отображения диаграммы</span>
          </div>
        ) : (
          <DonutChart data={data} />
        )}
      </div>
    </div>
  );
};

export default Statistics;
